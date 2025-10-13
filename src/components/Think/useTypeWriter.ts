// 重写的useTypeWriter钩子，采用更健壮的实现方式
import { useState, useEffect, useRef, useCallback } from 'react'

interface TypewriterResult {
  displayText: string
  isComplete: boolean
  reset: () => void
  skip: () => void
}

export const useTypewriter = (
  text: string,
  speed: number = 50,
  onComplete?: () => void,
  initialDelay: number = 0,
): TypewriterResult => {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()
  const isRunningRef = useRef(false)

  // 清除定时器的辅助函数
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = undefined
    }
  }, [])

  // 跳过动画，直接显示完整文本
  const skip = useCallback(() => {
    clearTimer()
    setDisplayText(text)
    setIsComplete(true)
    isRunningRef.current = false
    onComplete?.()
  }, [text, clearTimer, onComplete])

  // 重置打字机效果
  const reset = useCallback(() => {
    clearTimer()
    setDisplayText('')
    setIsComplete(false)
    isRunningRef.current = false
  }, [clearTimer])

  // 处理打字动画的主要逻辑
  const typeNextChar = useCallback(() => {
    if (!isRunningRef.current) return

    const currentDisplay = displayText
    const nextCharIndex = currentDisplay.length

    if (nextCharIndex < text.length) {
      // 打印下一个字符
      setDisplayText(currentDisplay + text[nextCharIndex])

      // 设置下一个字符的定时器
      timerRef.current = setTimeout(() => {
        typeNextChar()
      }, speed)
    } else {
      // 所有字符都已打印完毕
      setIsComplete(true)
      isRunningRef.current = false
      onComplete?.()
    }
  }, [displayText, text, speed, onComplete])

  // 当文本或初始延迟改变时重置并重新开始
  useEffect(() => {
    // 清除旧的定时器
    clearTimer()

    // 重置状态
    setDisplayText('')
    setIsComplete(false)
    isRunningRef.current = false

    // 如果文本为空，直接完成
    if (!text) {
      setIsComplete(true)
      onComplete?.()
      return
    }

    // 设置初始延迟（如果有）
    if (initialDelay > 0) {
      timerRef.current = setTimeout(() => {
        isRunningRef.current = true
        typeNextChar()
      }, initialDelay)
    } else {
      // 立即开始打字
      isRunningRef.current = true
      typeNextChar()
    }

    // 组件卸载时清理
    return clearTimer
  }, [text, initialDelay, clearTimer, typeNextChar, onComplete])

  return { displayText, isComplete, reset, skip }
}
