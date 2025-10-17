export const LOCAL_CONSOLE = 'vconsole_flag'

export const IS_DEV = process.env.NODE_ENV === 'development'

export const IS_QING = /Qing/i.test(navigator.userAgent)
export const IS_DING = /Ding/i.test(navigator.userAgent)
export const IS_WXWORK = /wxwork/i.test(navigator.userAgent)

export const C_THINK = 'thinkCard'
export const C_ANALYSIS = 'analysisCard'
export const C_HTML = 'htmlCard'
export const C_LOADING = 'chatLoading'
export const C_FILE = 'fileCard'

export const getRiskLevelColor = (level: string) => {
  switch (level) {
    case 'high':
      return 'text-red-500'
    case 'medium':
      return 'text-orange-500'
    case 'low':
      return 'text-green-500'
    default:
      return 'text-gray-500'
  }
}

export const getRiskLevelText = (level: string) => {
  switch (level) {
    case 'high':
      return '高风险'
    case 'medium':
      return '中风险'
    case 'low':
      return '低风险'
    default:
      return '未知风险'
  }
}
