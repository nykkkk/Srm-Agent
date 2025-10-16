import React from 'react'
import { produce } from 'immer'
import {
  BaseMessage,
  ChatId,
  MessageItem,
  OnMessageStatus,
  ProChatInstance,
  RequestWebsocketState,
} from '@kdcloudjs/kdesign-chatui'
import { C_HTML, C_THINK, IS_DEV } from '@/constant'
import { useStore } from '@/store'
import { ThinkCardData, ThinkMessage } from '@/customCard/ThinkCard'

let thinkData: ThinkCardData | null = null
let hasThink = false
let countMessage = 0

export const request: any = (dp: any) => {
  const { chatProRef } = dp

  const init = () => {
    hasThink = false
    thinkData = null
    countMessage = 0
  }

  const setThinkData = (v: ThinkMessage, messageId: string) => {
    thinkData = produce(thinkData, (thinkCardData: ThinkCardData) => {
      const { type, title, id, process, subtitle, agentNumber, status, content } = v
      const isCreate = status === 'create'
      const isCenterTop = typeof process === 'undefined'
      console.log('content', type)

      if (type === 'stop') {
        thinkCardData.stop = true
        thinkCardData.showMain = false
        return
      }

      if (!thinkCardData?.stop) {
        if (type === 'top') {
          if (isCreate) {
            return {
              id: '',
              title: title || '',
              subtitle,
              agentNumber: agentNumber || [],
              process: process || 0,
              center: {
                title: '',
                show: false,
                list: [],
              },
              showMain: true,
              stop: false,
              main: [],
              pre: '',
            }
          } else {
            // const target = thinkCardData
            // thinkCardData是immer的草稿对象，这里是把target也指向了草稿对象，按理说是完全等价的
            // 不需要这句，下面的target也可以写成thinkCardData
            // 因为是最上面的top，没有id需要识别，下面的center内容有id，通过id去识别然后编辑
            if (thinkCardData) {
              if (typeof title === 'string') {
                thinkCardData.title = title
              }
              if (Array.isArray(agentNumber)) {
                thinkCardData.agentNumber = agentNumber
              }
              if (typeof process === 'number') {
                thinkCardData.process = process
                if (process === 100) {
                  thinkCardData.showMain = false
                }
              }
            }
          }
        } else if (type === 'center') {
          if (isCenterTop) {
            thinkCardData.center = {
              title: title || '',
              show: true,
              list: thinkCardData.center?.list || [],
            }
          } else {
            if (isCreate) {
              thinkCardData.center.list.push({
                id: id || '',
                title: subtitle || '',
                subtitle: content || '',
                process: process || 0,
                level: undefined,
                content: undefined,
              })
            } else {
              const target = thinkCardData.center.list.find((item) => item.id === id)
              if (target) {
                if (typeof subtitle === 'string') {
                  target.title = subtitle
                }
                if (typeof process === 'number') {
                  target.process = process
                }
                if (typeof content === 'string') {
                  target.subtitle += content
                }
              }
            }
          }
        } else if (type === 'bottom') {
          if (isCreate) {
            thinkCardData.main.push({
              id: id || '',
              title: title || '',
              subtitle: subtitle || '',
              process: process || 0,
              show: true,
              content: content || '',
            })
          } else {
            const target = thinkCardData.main.find((item) => item.id === id)
            if (target) {
              if (typeof title === 'string') {
                target.title = title
              }
              if (typeof subtitle === 'string') {
                target.subtitle = subtitle
              }
              if (typeof process === 'number') {
                target.process = process
              }
              if (typeof content === 'string') {
                target.content += content
              }
            }
          }
        } else {
          if (typeof content === 'string') {
            thinkCardData.pre += content
          }
        }
      }
    })
    const content = { ...thinkData, id: messageId }

    if (hasThink) {
      chatProRef.setChatMessage(messageId, (msg: any) => {
        return produce(msg, (draftState: any) => {
          draftState[0] = { type: C_THINK, content }
        })
      })
      chatProRef.scrollToBottom()
    } else {
      hasThink = true
      chatProRef.setChatMessages(messageId, {
        msg: [{ type: C_THINK, content }],
        loading: false,
      })
      chatProRef.scrollToBottom()
      return null
    }
  }

  const generateCustomMessage = (m: any, payload: any = {}) => {
    chatProRef.getMessageId().then((id: any) => {
      const { onMessage: on } = chatProRef.createSmoothMessage(id, '', () => {
        console.log('complete', id)
      })

      chatProRef.toggleChatLoading(true, id)
      on('startLoading')

      setTimeout(() => {
        on('singleTyping', m, { ...payload })
      }, 500)
    })
  }

  return {
    mode: 'websocket',
    url: IS_DEV ? 'wss://chat.example.com' : useStore.getState().wsUrl,
    ping: { interval: 10000, data: 'ping' },
    transformSend: (
      message: BaseMessage,
      payload: any,
      onMessage: OnMessageStatus,
      lastId: string,
      currentId: string,
    ) => {
      init()
      console.log('websocket init', message)

      return message || 'ping'
    },
    transformMessage: (response: any, id, onMessage) => {
      const res = JSON.parse(response)
      const { status = '', message, payload = {} } = res
      console.log('websocket-------', res)

      if (status === C_THINK) {
        setThinkData(message, id as string)
        return null
      }
      if (status === C_HTML) {
        return {
          status: 'singleTyping',
          message: [{ type: C_HTML, content: message }],
          payload: '',
        }
      }

      return {
        status,
        message,
        payload,
      }
    },
    onclose(_, lastId) {},
    onCompleted(lastId: string) {
      console.log('onCompleted', lastId)
    },
    onerror(_, lastId) {},
    onStop(lastId) {
      chatProRef.generateMessage('ping', null, { type: 'ping' })
    },
  } as RequestWebsocketState
}
