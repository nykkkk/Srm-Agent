export const debounce = (func: any, wait = 0, options: any = {}) => {
  let timerId: string | number | NodeJS.Timeout | null | undefined = null
  let lastArgs: any[] | null = null
  let lastThis: null = null
  let leadingCalled = false

  const leading = Boolean(options.leading)
  const trailing = options.trailing !== false

  function invokeFunc() {
    func.apply(lastThis, lastArgs)
    leadingCalled = true
  }

  function startTimer() {
    timerId = setTimeout(() => {
      timerId = null

      if (trailing && (!leading || leadingCalled)) {
        func.apply(lastThis, lastArgs)
      }
      leadingCalled = false
    }, wait)
  }

  function debounced(this: any, ...args: any[]) {
    lastArgs = args
    lastThis = this

    if (!timerId && leading && !leadingCalled) {
      invokeFunc()
    }

    clearTimeout(timerId as number)
    startTimer()
  }

  debounced.cancel = () => {
    clearTimeout(timerId as number)
    timerId = null
    leadingCalled = false
  }

  debounced.flush = () => {
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
      if (trailing) {
        func.apply(lastThis, lastArgs)
      }
      leadingCalled = false
    }
  }

  return debounced
}
