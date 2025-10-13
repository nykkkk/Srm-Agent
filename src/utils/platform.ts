export const isRealMobile = () => {
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  const isPCPlatform = /Win32|MacIntel|Linux x86_64/.test(navigator.platform)
  const isMobileUA = /Mobi|Android|iPhone/.test(navigator.userAgent)

  return !((isMobileUA && isPCPlatform) || (hasTouch && !window.DeviceOrientationEvent))
}
