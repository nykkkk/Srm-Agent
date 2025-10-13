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
