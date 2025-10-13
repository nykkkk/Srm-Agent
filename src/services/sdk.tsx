import { BaseMessage, ChatMessage, ProChatInstance } from '@kdcloudjs/kdesign-chatui'
import { Icon, Modal, Toast } from 'kdesign-mobile'
import * as dd from 'dingtalk-jsapi'
import * as ww from '@wecom/jssdk'

import { IS_DING, IS_QING, IS_WXWORK } from '@/constant'
import { useStore } from '@/store'

const isSuccess = (res: any, name = '') => {
  console.log(name, res)

  const success = res.success === true || res.success === 'true'
  if (!success && IS_QING && res?.error) {
    Toast.show({
      content: res.error,
      duration: 2000,
    })
  }
  if (!success && IS_DING && res?.err?.result?.errorMessage) {
    Toast.show({
      content: res?.err?.result?.errorMessage,
      duration: 2000,
    })
  }
  return success
}

const sendMessage = (chatProRef: any, callback: any) => {
  if (chatProRef) {
    const fileList = useStore.getState().fileList
    const fileDoneList = fileList?.filter((d) => d.status === 'done')
    const temp: BaseMessage = [{ type: 'user', msg: [] }]

    // if (fileDoneList.length > 0) {
    //   const content: ChatMessage['msg'] = []
    //   fileDoneList.forEach((f, i) => {
    //     content.push({ id: f.uid, name: f.name, type: f.type, url: f?.response.url, size: f.size })
    //   })
    //   temp[0].msg.push({ type: C_FILE, content })
    // }

    chatProRef?.getMessageId().then((id) => {
      const { onMessage: on } = chatProRef?.createSmoothMessage(id, '', () => {
        setTimeout(() => {
          useStore.getState().setFileList([])
          useStore.getState().setShowUpload(false)
        }, 20)
      })

      const fail = (flag = true) => {
        on('end')
        chatProRef?.deleteMessage(id)
        flag && Toast.show({ content: useStore.getState().locale('chat.voiceEmpty') })
        useStore.getState().setLoading(false)
      }

      chatProRef?.toggleChatLoading(true, id)
      on('startLoading', '', { type: 'user' })
      chatProRef?.scrollToBottom(true)

      callback({ fail }).then((content: any) => {
        setTimeout(
          () => {
            chatProRef?.scrollToBottom(true)
            const vv = IS_QING ? useStore.getState().voiceValue : content

            if (vv) {
              temp[0].msg.push({ type: 'markdown', content: vv })
              on('singleTyping', temp[0].msg, { loading: false })
              chatProRef?.generateMessage(temp, '')
            } else if (temp[0].msg.length === 0) {
              on('end')
              chatProRef?.deleteMessage(id)
              Toast.show({ content: useStore.getState().locale('chat.voiceEmpty') })
              useStore.getState().setLoading(false)
            } else {
              on('end')
              chatProRef?.deleteMessage(id)
              chatProRef?.startGenerateMessage(temp)
            }
          },
          IS_QING ? 1000 : 100,
        )
      })
    })
  }
}

export const sdkSetWebViewTitle = (title: string) => {
  if (IS_DING) {
    dd.setNavigationTitle({ title, success: () => {}, fail: () => {}, complete: () => {} })
  } else if (IS_WXWORK) {
    document.title = title
  } else {
    if (!IS_QING || !window?.qing) return

    window?.qing?.call('setWebViewTitle', { title })
  }
}

export const tryBack = () => {
  return new Promise((resolve, reject) => {
    let handled = false

    const handler = () => {
      handled = true
      window.removeEventListener('popstate', handler)
      resolve(true)
    }

    window.addEventListener('popstate', handler)

    history.back()

    setTimeout(() => {
      if (!handled) {
        window.removeEventListener('popstate', handler)
        resolve(false)
      }
    }, 200)
  })
}

const defBackSuccess = () => {
  console.log('------defBackSuccess', history.length)

  tryBack().then((success) => {
    console.log('tryBack', success, history.length)
    if (!success) {
      if (useStore.getState()?.historyOpen) {
        useStore.getState().setHistoryOpen(false)
      } else {
        // newChat(invoke, chatProRef)
        console.log('---defBackSuccess', 'back')
        history.back()
      }
    }
  })
}

export const sdkDefback = () => {
  if (IS_DING) {
    dd.setNavigationLeft({
      control: true,
      text: '',
      success: () => defBackSuccess(),
    })
  } else if (IS_WXWORK) {
    ww.onHistoryBack(() => {
      console.log('------onHistoryBack')
      return true
    })
  } else {
    if (!IS_QING || !window?.qing) return

    window?.qing.call('defback', { success: () => defBackSuccess() })
  }
}

export const sdkInit = ({ chatProRef, content }: { chatProRef: ProChatInstance | null; content: any }) => {
  sdkDefback()
  sdkSetWebViewTitle(content.webTitle)
  if (IS_DING) {
    dd.biz.navigation.setMenu({
      items: [
        { id: 'newchat', text: content.newChat },
        { id: 'refresh', text: content.refresh },
      ],
      onSuccess(data: any) {
        console.log(data)
      },
    })
  } else if (IS_WXWORK) {
    ww.hideAllNonBaseMenuItem()
  } else {
    if (!IS_QING) return

    window?.qing?.call('createPop', {
      collapseToItems: false,
      items: chatProRef ? [{ text: content.newChat, callBackId: 'newChat' }] : [],
      // menuList: ['share'],
      success(res) {
        console.log(res)
      },
    })
  }
}

export const sdkLocation = (invoke: any, sessionid: string) => {
  if (IS_DING) {
    dd.ready(() => {
      dd.device.geolocation.get({
        targetAccuracy: 200,
        coordinate: 1,
        withReGeocode: true,
        useCache: true,
        onSuccess(res: any) {
          const temp = { ...(res || {}), id: sessionid, type: 'dingding' }
          console.log(temp)
        },
        onFail() {},
      } as any)
    })
  } else if (IS_WXWORK) {
    ww.getLocation({
      type: 'wgs84' as any,
    }).then((res) => {
      console.log('ww getLocation', res)
      const temp = { ...(res || {}), id: sessionid, type: 'wxwork' }
      console.log(temp)
    })
  } else {
    if (!IS_QING) return

    window.qing?.call('getLocation', {
      success: (res) => {
        if (isSuccess(res, 'sdkLocation')) {
          const temp = { ...(res.data || {}), id: sessionid, type: 'yunzhijia' }
          console.log(temp)
        }
      },
    })
  }
}

export const sdkStartRecord = () => {
  if (IS_DING) {
    dd.startRecord({
      maxDuration: 60,
      success: () => {
        useStore.getState().setVoiceTime(new Date().getTime())
        useStore.getState().setVoiceValue('')
      },
      fail: () => {
        Toast.show({ content: 'Record Error' })
      },
      complete: () => {},
    })
  } else if (IS_WXWORK) {
    ww.startRecord()
      .then(() => {
        useStore.getState().setVoiceTime(new Date().getTime())
        useStore.getState().setVoiceValue('')
      })
      .catch(() => {
        Toast.show({ content: 'Record Error' })
      })
  } else {
    if (!IS_QING) return

    window.qing?.call('startSpeechRecognize', {
      success: (res) => {
        if (isSuccess(res)) {
          const { status, result, allResult, errorMessage } = res?.data || {}
          switch (status) {
            case 1:
              useStore.getState().setVoiceTime(new Date().getTime())
              break
            case 5:
              useStore.getState().setVoiceValue(allResult || '')
              break
            case 4:
              Toast.show({ content: errorMessage })
              useStore.getState().setVoiceValue('')
              break
          }
        }
      },
    })
  }
}

export const sdkStopRecord = (chatProRef: any = undefined) => {
  if (IS_DING) {
    sendMessage(chatProRef, ({ fail }) => {
      return new Promise((resolve, _) => {
        dd.stopRecord({
          success: (res) => {
            const { mediaId, duration } = res
            if (duration < 0.2) {
              Toast.show({ content: useStore.getState().locale('chat.voiceTooShort') })
              fail(false)
              return
            }

            dd.translateVoice({
              mediaId,
              duration,
              success: (r) => {
                const { content = '' } = r
                if (content.includes('无内容')) {
                  fail()
                  return
                }

                resolve(content)
              },
              fail,
            })
          },
          fail,
        })
      })
    })
  } else if (IS_WXWORK) {
    sendMessage(chatProRef, ({ fail }) => {
      return new Promise((resolve, _) => {
        ww.stopRecord()
          .then((res) => {
            const { localId } = res
            console.log('localId', localId)

            ww.translateVoice({
              localId,
              isShowProgressTips: false,
            })
              .then((r) => {
                console.log('translateResult', r.translateResult)

                const { translateResult = '' } = r
                if (translateResult.includes('无内容') || !translateResult) {
                  fail()
                  return
                }

                resolve(translateResult)
              })
              .catch((err) => {
                console.error('translateVoice', err)
                fail()
              })
          })
          .catch((err) => {
            console.error('stopRecord', err)
            fail()
          })
      })
    })
  } else {
    const beginTime = useStore.getState().voiceTime
    const endTime = new Date().getTime()
    if (beginTime && endTime - beginTime > 1000) {
      sendMessage(chatProRef, () => {
        return new Promise((resolve, _) => {
          resolve('')
        })
      })
    } else {
      Toast.show({ content: useStore.getState().locale('chat.voiceTooShort') })
    }

    if (!IS_QING) return

    window.qing?.call('stopSpeechRecognize', {
      success: (res) => {
        isSuccess(res, 'stopSpeechRecognize')
      },
    })
  }
}

export const sdkOpenUrl = (href: string) => {
  if (href) {
    const urlParam = new URL(href, document.baseURI).href
    console.log('sdkOpenUrl---', urlParam)

    if (IS_QING) {
      window.qing?.call('gotoLightApp', {
        appName: undefined,
        urlParam,
        error: (res) => {
          console.log(`qing openLink error`, urlParam)
          window.location.href = urlParam
        },
      })
    } else if (IS_DING) {
      dd.biz.util.openLink({
        url: urlParam,

        onFail() {
          console.log(`dingding openLink error`, urlParam)
          window.location.href = urlParam
        },
      } as any)
    } else if (IS_WXWORK) {
      window.location.href = urlParam
    } else {
      window.location.href = urlParam
    }
  }
}

const jsApiList = [
  'openDefaultBrowser',
  'onHistoryBack',
  'showOptionMenu',
  'hideOptionMenu',
  'hideAllNonBaseMenuItem',
  'hideMenuItems',
  'closeWindow',
  'getLocation',
  'startRecord',
  'stopRecord',
  'translateVoice',
]

export const initWxwork = (data: any = {}) => {
  console.log('initWxwork begin', data)
  const { corpId, timestamp, nonceStr, signature, agentConfig } = data

  try {
    ww.register({
      corpId,
      jsApiList,
      getConfigSignature: () => ({ timestamp, nonceStr, signature }),
      onConfigSuccess: (res) => {
        console.log('ww.register success', res)
      },
      onConfigFail: (err) => console.log('ww.register error', err),
      onConfigComplete: (res) => {
        console.log(res)
      },
    })
  } catch (error) {
    console.error('SDK Error:', error)
  }
}

export const initDing = (data: any = {}) => {
  const { agentid, corpId, timeStamp, nonceStr, signature, type } = data
  const temp = {
    appId: agentid,
    corpId,
    timeStamp,
    nonceStr,
    signature,
    jsApiList: [
      'getLocation',
      'device.geolocation.get',
      'startRecord',
      'stopRecord',
      'translateVoice',
      'setNavigationTitle',
      'setNavigationLeft',
      'biz.navigation.setRight',
    ],
  }

  if (agentid) {
    dd.config(temp)

    dd.error((err) => {
      console.error(`---Ding Error: ${JSON.stringify(err)}`)
    })
  }
}
