export const LOCAL_CONSOLE = 'vconsole_flag'

export const IS_DEV = process.env.NODE_ENV === 'development'

export const IS_QING = /Qing/i.test(navigator.userAgent)
export const IS_DING = /Ding/i.test(navigator.userAgent)
export const IS_WXWORK = /wxwork/i.test(navigator.userAgent)

export const C_THINK = 'thinkCard'
export const C_LOADING = 'chatLoading'
export const C_FILE = 'fileCard'
