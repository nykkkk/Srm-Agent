# websocket：
## websocket封装
*只对think数据流式输出作用*
C:\Users\kingdee\Desktop\SRMAgent\src\services\WebSocketContext.tsx 是websocket的上下文
在C:\Users\kingdee\Desktop\SRMAgent\src\pages\index.tsx（根组件）中使用，内部子组件都可以使用
## websocket使用
可以参考C:\Users\kingdee\Desktop\SRMAgent\src\pages\procurement-risk\index.tsx中，先引入
const { isConnected, send, addMessageListener, removeMessageListener } = useWebSocket()
  const [messages, setMessages] = useState<WebSocketMessage[]>([])

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

  定义好监听器，需要监听好发送数据的**type**

# Http
对非流式输出内容进行请求
接口定义路径：
C:\Users\kingdee\Desktop\SRMAgent\src\services\index.ts