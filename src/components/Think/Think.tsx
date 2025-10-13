// components/ThinkingProcess.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useTypewriter } from './useTypeWriter'
import { AgentMessage, ThinkingProcessProps } from './types'
import './Think.less'

const ThinkingProcess: React.FC<ThinkingProcessProps> = ({
  messages,
  onComplete,
  speed = 30,
  showCursor = true,
  autoStart = true,
  onMessageComplete,
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [completedMessages, setCompletedMessages] = useState<Set<string>>(new Set())
  const [isAllComplete, setIsAllComplete] = useState(false)
  const [isStarted, setIsStarted] = useState(autoStart)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const currentMessage = messages[currentMessageIndex]
  let message = messages[0]?.message || []
  console.log('show message', message)
  // 重写handleMessageComplete函数，采用更健壮的消息切换逻辑
  const handleMessageComplete = useCallback(() => {
    // 首先清除任何可能存在的旧定时器
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    // 在函数内部直接获取当前消息，避免闭包问题
    const currentMsg = message[currentMessageIndex]
    if (!currentMsg) return

    // 标记当前消息完成
    setCompletedMessages((prev) => new Set(prev).add(currentMsg.id))
    onMessageComplete?.(currentMsg.id)

    // 检查是否所有消息都完成了
    if (currentMessageIndex >= message.length - 1) {
      setIsAllComplete(true)
      onComplete?.()
    } else {
      // 为了避免状态更新的异步问题，我们使用setTimeout来确保下一条消息的切换
      // 使用requestAnimationFrame确保在下一帧执行，避免渲染阻塞
      requestAnimationFrame(() => {
        // 继续下一条消息，根据延迟设置
        const nextIndex = currentMessageIndex + 1
        const nextMessage = message[nextIndex]
        const delay = nextMessage?.delay || 200

        // 设置新的定时器
        timerRef.current = setTimeout(() => {
          setCurrentMessageIndex(nextIndex)
        }, delay)
      })
    }
  }, [currentMessageIndex, message, onComplete, onMessageComplete])

  const { displayText, isComplete, skip } = useTypewriter(
    currentMessage?.content || '',
    speed,
    handleMessageComplete,
    0, // 不使用消息开始时的延迟，因为我们在handleMessageComplete中已经处理了消息之间的延迟
  )

  // 手动开始思考过程
  const startProcess = useCallback(() => {
    setIsStarted(true)
    setCurrentMessageIndex(0)
    setCompletedMessages(new Set())
    setIsAllComplete(false)
  }, [])

  // 跳过当前消息
  const skipCurrentMessage = useCallback(() => {
    skip()
  }, [skip])

  // 重置整个思考过程
  const resetProcess = useCallback(() => {
    setIsStarted(autoStart)
    setCurrentMessageIndex(0)
    setCompletedMessages(new Set())
    setIsAllComplete(false)
  }, [autoStart])

  // 自动开始 - 修复无限循环问题
  useEffect(() => {
    // 只在组件挂载时检查一次是否自动开始，避免循环依赖导致的无限更新
    if (autoStart) {
      setIsStarted(true)
    }
  }, [autoStart])

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  // 渲染不同类型的消息
  const renderMessage = (message: AgentMessage, index: number) => {
    const isCurrent = index === currentMessageIndex && isStarted
    const isCompleted = completedMessages.has(message.id)
    const shouldShow = index <= currentMessageIndex && isStarted

    if (!shouldShow) return null

    let content = ''
    if (isCompleted) {
      content = message.content
    } else if (isCurrent) {
      content = displayText
    } else if (index < currentMessageIndex) {
      // 对于索引小于当前消息索引的消息，即使未被标记为完成，也应该显示其完整内容
      // 这确保了消息能连续显示
      content = message.content
    } else {
      return null
    }

    const showCursor = isCurrent && !isComplete

    switch (message.type) {
      case 'title':
        return (
          <div key={message.id} className="thinking-title">
            <h1>{content}</h1>
            {showCursor && <span className="typing-cursor">|</span>}
          </div>
        )

      case 'subtitle':
        return (
          <div key={message.id} className="thinking-subtitle">
            <h2>{content}</h2>
            {showCursor && <span className="typing-cursor">|</span>}
          </div>
        )

      case 'agent':
        return (
          <div key={message.id} className="agent-section">
            <div className="agent-header">
              <span className={`agent-status ${message.status || 'processing'}`}>
                {message.status === 'completed'
                  ? '✅'
                  : message.status === 'thinking'
                    ? '🤔'
                    : message.status === 'waiting'
                      ? '⏳'
                      : '🔄'}
              </span>
              <span className="agent-name">
                {message.agentName}
                {showCursor && <span className="typing-cursor">|</span>}
              </span>
            </div>
            {content && (
              <div className="agent-content">
                {content.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
                {showCursor && <span className="typing-cursor">|</span>}
              </div>
            )}
          </div>
        )

      case 'step':
        return (
          <div key={message.id} className="step-section">
            <div className="step-header">
              <h3>{content}</h3>
              {showCursor && <span className="typing-cursor">|</span>}
            </div>
            {message.steps && message.steps.length > 0 && (
              <div className="step-content">
                {message.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="step-item">
                    • {step}
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'text':
        return (
          <div key={message.id} className="thinking-text">
            {content.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            {showCursor && <span className="typing-cursor">|</span>}
          </div>
        )

      case 'divider':
        return <div key={message.id} className="thinking-divider" />

      case 'progress':
        return (
          <div key={message.id} className="progress-section">
            <div className="progress-header">
              <span>{content}</span>
              {message.progress !== undefined && <span className="progress-percent">{message.progress}%</span>}
            </div>
            {message.progress !== undefined && (
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${message.progress}%` }} />
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="thinking-process">
      {/* 控制按钮 */}
      <div className="thinking-controls">
        {!isStarted && (
          <button onClick={startProcess} className="control-btn start-btn">
            开始思考
          </button>
        )}
        {isStarted && !isAllComplete && (
          <button onClick={skipCurrentMessage} className="control-btn skip-btn">
            跳过当前
          </button>
        )}
        {isAllComplete && (
          <button onClick={resetProcess} className="control-btn reset-btn">
            重新开始
          </button>
        )}
      </div>

      {/* 思考内容 */}
      <div className="thinking-container">
        {message.map((message, index) => renderMessage(message, index))}

        {isAllComplete && (
          <div className="process-complete">
            <div className="complete-indicator">✅ 思考过程完成</div>
          </div>
        )}
      </div>

      {/* 进度指示器 */}
      {isStarted && !isAllComplete && (
        <div className="progress-indicator">
          进度: {currentMessageIndex + 1} / {message.length}
        </div>
      )}
    </div>
  )
}

export default ThinkingProcess
