import React from 'react'

export interface WebSocketMessage {
  type: string
  status?: string
  message?: string
  data?: any
  progress?: number
  timestamp?: number
}

interface WebSocketConfig {
  url: string
  pingInterval?: number
  onMessage?: (message: WebSocketMessage) => void
  onOpen?: () => void
  onClose?: () => void
  onError?: (error: Event) => void
  reconnect?: boolean
  reconnectInterval?: number
}

export const useWebSocket = (config: WebSocketConfig) => {
  const {
    url,
    pingInterval = 10000,
    onMessage,
    onOpen,
    onClose,
    onError,
    reconnect = true,
    reconnectInterval = 3000,
  } = config

  const [isConnected, setIsConnected] = React.useState(false)
  const [lastMessage, setLastMessage] = React.useState<WebSocketMessage | null>(null)
  const wsRef = React.useRef<WebSocket | null>(null)
  const pingTimerRef = React.useRef<NodeJS.Timeout>()
  const reconnectTimerRef = React.useRef<NodeJS.Timeout>()
  const isConnectingRef = React.useRef(false)
  const shouldReconnectRef = React.useRef(true)

  // 清理资源
  const cleanup = React.useCallback(() => {
    if (pingTimerRef.current) {
      clearInterval(pingTimerRef.current)
    }
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current)
    }
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    isConnectingRef.current = false
  }, [])

  // 发送消息
  const send = React.useCallback((message: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const data = typeof message === 'string' ? message : JSON.stringify(message)
      wsRef.current.send(data)
      return true
    }
    return false
  }, [])

  // 连接WebSocket
  const connect = React.useCallback(() => {
    if (isConnectingRef.current || wsRef.current?.readyState === WebSocket.OPEN) {
      return
    }

    try {
      isConnectingRef.current = true
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        console.log('WebSocket connected')
        setIsConnected(true)
        isConnectingRef.current = false

        // 设置心跳
        pingTimerRef.current = setInterval(() => {
          send('ping')
        }, pingInterval)

        onOpen?.()
      }

      ws.onmessage = (event) => {
        try {
          // 处理心跳响应
          if (event.data === 'pong') {
            return
          }

          const message: WebSocketMessage = JSON.parse(event.data)
          console.log('frontEnd Received message:', message)

          setLastMessage(message)
          onMessage?.(message)
        } catch (error) {
          console.error('Message parse error:', error)
        }
      }

      ws.onclose = (event) => {
        console.log('WebSocket disconnected', event.code, event.reason)
        setIsConnected(false)
        isConnectingRef.current = false
        cleanup()

        // 自动重连
        if (shouldReconnectRef.current && reconnect) {
          console.log(`Attempting to reconnect in ${reconnectInterval}ms`)
          reconnectTimerRef.current = setTimeout(() => {
            connect()
          }, reconnectInterval)
        }

        onClose?.()
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        isConnectingRef.current = false
        onError?.(error)
      }
    } catch (error) {
      console.error('WebSocket connection error:', error)
      isConnectingRef.current = false
    }
  }, [url, pingInterval, reconnect, reconnectInterval, onMessage, onOpen, onClose, onError, send, cleanup])

  // 断开连接
  const disconnect = React.useCallback(() => {
    console.log('Manual disconnect')
    shouldReconnectRef.current = false // 阻止自动重连
    cleanup()
    setIsConnected(false)
  }, [cleanup])

  // 发送聊天消息
  const sendChatMessage = React.useCallback(
    (content: string, options?: any) => {
      return send({
        type: 'chat',
        content,
        ...options,
        timestamp: Date.now(),
      })
    },
    [send],
  )

  // 发送思考消息
  const sendThinkMessage = React.useCallback(
    (data: any) => {
      return send({
        type: 'think',
        data,
        timestamp: Date.now(),
      })
    },
    [send],
  )

  React.useEffect(() => {
    // 只在组件挂载时连接
    shouldReconnectRef.current = true
    connect()

    return () => {
      console.log('Component unmounting, cleaning up WebSocket')
      shouldReconnectRef.current = false
      cleanup()
    }
    // 注意：这里移除了 connect 和 cleanup 作为依赖项
    // 因为它们的变化会导致不必要的重连
  }, []) // 空依赖数组，只在挂载/卸载时执行

  return {
    isConnected,
    lastMessage,
    send,
    sendChatMessage,
    sendThinkMessage,
    connect,
    disconnect,
  }
}
