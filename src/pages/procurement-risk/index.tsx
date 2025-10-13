import React, { useEffect, useState } from 'react'
import ThinkingProcess from '../../components/Think/Think'
import { AgentMessage } from '../../components/Think/types'
// import { WebSocketMessage, useWebSocket } from '@/services/connect'
import { getCookieName } from '@/utils'
import { useWebSocket, WebSocketMessage } from '@/services/WebSocketContext'

const ProcurementRisk = () => {
  const { isConnected, send, addMessageListener, removeMessageListener } = useWebSocket()
  const [messages, setMessages] = useState<WebSocketMessage[]>([])

  // 避免在渲染中创建新函数
  // 监听特定类型的消息
  useEffect(() => {
    const handleChatMessage = (message: WebSocketMessage) => {
      setMessages((prev) => [...prev, message])
    }
    const handleStatusMessage = (message: WebSocketMessage) => {
      setMessages((prev) => [...prev, message])
    }

    // 添加监听器
    addMessageListener('chat', handleChatMessage)
    addMessageListener('think', handleChatMessage)
    addMessageListener('status', handleChatMessage)

    // 清理监听器
    return () => {
      removeMessageListener('chat', handleChatMessage)
      removeMessageListener('think', handleChatMessage)
      removeMessageListener('status', handleStatusMessage)
    }
  }, [addMessageListener, removeMessageListener])

  const handleSendMessage = () => {
    send({
      type: 'chat',
      content: 'Hello from ComponentA',
      timestamp: Date.now(),
    })
  }

  const [isThinkingComplete, setIsThinkingComplete] = useState(false)

  const handleComplete = () => {
    // console.log('所有消息输出完成')
    setIsThinkingComplete(true)
  }

  const handleMessageComplete = (messageId: string) => {
    // console.log(`消息 ${messageId} 输出完成`)
  }

  return (
    <div className="App">
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>大模型思考过程演示</h1>
        <button onClick={handleSendMessage} disabled={!isConnected}>
          发送消息
        </button>
        <ThinkingProcess
          messages={messages}
          onComplete={handleComplete}
          onMessageComplete={handleMessageComplete}
          speed={20}
          showCursor={true}
          autoStart={true}
        />

        {isThinkingComplete && (
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              background: '#f6ffed',
              border: '1px solid #b7eb8f',
              borderRadius: '6px',
            }}
          >
            <h3>思考过程已完成！</h3>
            <p>所有 Agents 已完成协作，可以查看完整的行程规划方案。</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProcurementRisk
