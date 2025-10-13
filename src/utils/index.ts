import zhCN from 'kdesign-mobile/es/locale/zh-CN'
import copy from 'copy-to-clipboard'
import { Toast } from 'kdesign-mobile'

const TEXT = 'text'
const IMG = 'img'
const LINK = 'link'
const REFERENCE = 'reference'
const MARKDOWN = 'markdown'
const THINKING = 'thinking'
const IFRAME = 'iframe'

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const copyData = (data: any) => {
  let copyContent = ''
  data.forEach((item: any) => {
    let content
    if (item.type !== 'iframe') {
      content = typeof item.content === 'string' ? item.content : `${item.content}`
    }
    switch (item.type) {
      case IFRAME:
        copyContent += `[${item?.title || IFRAME}]\n(${item.src})\n`
        break
      case IMG:
        copyContent += `[${content}]\n(${item.src})\n`
        break
      case REFERENCE:
        copyContent += `[${item?.title}]\n`
        item?.content?.forEach((referenceItem: any) => {
          copyContent += `${referenceItem?.content}(${referenceItem.href})\n`
        })
        break
      case LINK:
        copyContent += `[${content}]\n(${item.href})\n`
        break
      default:
        copyContent += `${content}\n`
        break
    }
  })
  copy(copyContent)
  Toast.show({ content: '复制成功' })
}

export const randomSelect = (arr: any[], num: number) => {
  const array = [...arr].sort(() => Math.random() - 0.5)
  return array.slice(0, num)
}

export const getCookieName = () => {
  const state = (window as any)?.store?.getState()
  console.log('state:', window, (window as any)?.store, state)
  const rootPageId = state?.get('rootPageId')
  console.log('rootPageId:', rootPageId)

  if (rootPageId) {
    return state.getIn(['forms', rootPageId, 'config', 'cookieName']) || 'KERPSESSIONID'
  }
  return ''
}

export const scrollToBottom = (bottomRef: React.RefObject<HTMLDivElement>) => {
  const dom: HTMLElement = bottomRef.current as any
  dom?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}

export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export const getKDLocle = (locale: any) => {
  return {
    localeConfig: {
      localeData: {
        ...zhCN,
        'ChatCard.loadingText': locale('chatPro.loadingText'),
        'ChatCard.msgTypeStop': locale('chatPro.msgTypeStop'),
        'ChatCard.msgTypeError': locale('chatPro.msgTypeError'),
        'ChatPro.history': locale('chatPro.history'),
        'ChatPro.historyPlaceholder': locale('chatPro.historyPlaceholder'),
        'ChatPro.historyDel': locale('chatPro.historyDel'),
        'ChatPro.historyRename': locale('chatPro.historyRename'),
        'ChatPro.historyEmpty': locale('chatPro.historyEmpty'),
        'ChatPro.historyCancel': locale('chatPro.historyCancel'),
        'ChatPro.historyConfirm': locale('chatPro.historyConfirm'),
        'ChatPro.historyDelConfirm': locale('chatPro.historyDelConfirm'),
      },
    },
  }
}

export const loadQing = (callback: any) => {
  const script = document.createElement('script')
  script.src = 'https://static.yunzhijia.com/public/js/qing/latest/qing.js'
  script.onload = callback
  document.head.appendChild(script)
}
export const loadWxwork = (callback: any) => {
  const script = document.createElement('script')
  script.src = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'
  script.onload = callback
  document.head.appendChild(script)
}
