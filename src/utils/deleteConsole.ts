export const deleteConsoleError = () => {
  if (typeof window !== 'undefined') {
    const originalWarn = console.warn
    const originalError = console.error
    const originalLog = console.log

    console.warn = (...args) => {
      const message = args.join(' ')
      if (
        message.includes('findDOMNode is deprecated') ||
        message.includes('findDOMNode') ||
        message.includes('react-dom.development.js') ||
        message.includes('[kdesign]-slider') ||
        message.includes('Slider[step]') ||
        message.includes('Slider[dots]') ||
        message.includes('Support for defaultProps will be removed') ||
        message.includes('defaultProps') ||
        message.includes('forwardRef render functions accept exactly two parameters') ||
        message.includes('Did you forget to use the ref parameter') ||
        message.includes('Warning: forwardRef render functions accept exactly two parameters')
      ) {
        return
      }
      originalWarn.apply(console, args)
    }

    console.error = (...args) => {
      const message = args.join(' ')
      if (
        message.includes('findDOMNode is deprecated') ||
        message.includes('findDOMNode') ||
        message.includes('[kdesign]-slider') ||
        message.includes('Slider[step]') ||
        message.includes('Slider[dots]') ||
        message.includes('Support for defaultProps will be removed') ||
        message.includes('defaultProps') ||
        message.includes('forwardRef render functions accept exactly two parameters') ||
        message.includes('Did you forget to use the ref parameter') ||
        message.includes('Warning: forwardRef render functions accept exactly two parameters')
      ) {
        return
      }
      originalError.apply(console, args)
    }

    console.log = (...args) => {
      const message = args.join(' ')
      if (
        message.includes('forwardRef render functions accept exactly two parameters') ||
        message.includes('Did you forget to use the ref parameter') ||
        message.includes('Warning: forwardRef render functions accept exactly two parameters')
      ) {
        return
      }
      originalLog.apply(console, args)
    }
  }
}

export default deleteConsoleError
