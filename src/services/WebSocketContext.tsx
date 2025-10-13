import React, { createContext, useContext, useRef, useEffect, useState, useCallback, ReactNode } from 'react'

export interface WebSocketMessage {
  type: string
  status?: string
  message?: string
  data?: any
  progress?: number
  timestamp?: number
}

interface WebSocketContextType {
  isConnected: boolean
  send: (message: any) => boolean
  addMessageListener: (type: string, callback: (message: WebSocketMessage) => void) => void
  removeMessageListener: (type: string, callback: (message: WebSocketMessage) => void) => void
  lastMessage: WebSocketMessage | null
}

const WebSocketContext = createContext<WebSocketContextType | null>(null)

interface WebSocketProviderProps {
  url: string
  children: ReactNode
  pingInterval?: number
  reconnect?: boolean
  reconnectInterval?: number
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  url,
  children,
  pingInterval = 10000,
  reconnect = true,
  reconnectInterval = 3000,
}) => {
  const wsRef = useRef<WebSocket | null>(null)
  const listenersRef = useRef<Map<string, Set<(message: WebSocketMessage) => void>>>(new Map())
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)
  const isConnectingRef = useRef(false)
  const shouldReconnectRef = useRef(true)
  const pingTimerRef = useRef<NodeJS.Timeout>()
  const reconnectTimerRef = useRef<NodeJS.Timeout>()

  // 添加消息监听器
  const addMessageListener = useCallback((type: string, callback: (message: WebSocketMessage) => void) => {
    if (!listenersRef.current.has(type)) {
      listenersRef.current.set(type, new Set())
    }
    listenersRef.current.get(type)!.add(callback)
  }, [])

  // 移除消息监听器
  const removeMessageListener = useCallback((type: string, callback: (message: WebSocketMessage) => void) => {
    const typeListeners = listenersRef.current.get(type)
    if (typeListeners) {
      typeListeners.delete(callback)
    }
  }, [])

  // 发送消息
  const send = useCallback((message: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const data = typeof message === 'string' ? message : JSON.stringify(message)
      wsRef.current.send(data)
      return true
    }
    return false
  }, [])

  // 处理收到的消息
  const handleMessage = useCallback((message: WebSocketMessage) => {
    setLastMessage(message)

    // 通知所有监听该类型的回调
    const typeListeners = listenersRef.current.get(message.type)
    if (typeListeners) {
      typeListeners.forEach((callback) => callback(message))
    }

    // 通知所有监听 '*' 类型的回调（监听所有消息）
    const allListeners = listenersRef.current.get('*')
    if (allListeners) {
      allListeners.forEach((callback) => callback(message))
    }
  }, [])

  // 清理资源
  const cleanup = useCallback(() => {
    if (pingTimerRef.current) {
      clearInterval(pingTimerRef.current)
    }
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current)
    }
    isConnectingRef.current = false
  }, [])

  // 建立连接
  const connect = useCallback(() => {
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
      }

      ws.onmessage = (event) => {
        try {
          // 处理心跳响应
          if (event.data === 'pong') {
            return
          }

          const message: WebSocketMessage = JSON.parse(event.data)
          console.log('frontEnd Received message:', message)
          handleMessage(message)
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
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        isConnectingRef.current = false
      }
    } catch (error) {
      console.error('WebSocket connection error:', error)
      isConnectingRef.current = false
    }
  }, [url, pingInterval, reconnect, reconnectInterval, handleMessage, cleanup, send])

  // 断开连接
  const disconnect = useCallback(() => {
    shouldReconnectRef.current = false
    if (wsRef.current) {
      wsRef.current.close()
    }
    cleanup()
    setIsConnected(false)
  }, [cleanup])

  // 初始化连接
  useEffect(() => {
    shouldReconnectRef.current = true
    connect()

    return () => {
      shouldReconnectRef.current = false
      disconnect()
    }
  }, [connect, disconnect])

  const value = {
    isConnected,
    send,
    addMessageListener,
    removeMessageListener,
    lastMessage,
  }

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>
}

// 使用 Hook
export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}
