import 'umi/typings'

declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

declare module 'uuid'

declare module '*.json' {
  const value: any
  export default value
}

declare global {
  interface Window {
    qing?: {
      call: (method: string, options: any) => void
    }
    wx?: any
  }
}
