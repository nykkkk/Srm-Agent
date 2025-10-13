import { sleep } from '@/utils'
import { ws, http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { completeThinkingProcess } from './mockSocketThinkData'

// WebSocket连接配置
const socket = ws.link('wss://your-websocket-server.com')

const handlers = [
  socket.addEventListener('connection', ({ client }) => {
    console.log('Client connected')

    client.addEventListener('message', async (event) => {
      console.log('BackEnd Received message:', event.data)

      const send = (data: any) => client.send(JSON.stringify(data))

      // 处理心跳包
      if (event.data === 'ping') {
        send({ type: 'pong', timestamp: Date.now() })
        return
      }

      try {
        let data: string
        if (typeof event.data === 'string') {
          data = event.data
        } else if (event.data instanceof Blob) {
          data = await event.data.text()
        } else if (event.data instanceof ArrayBuffer) {
          data = new TextDecoder().decode(event.data)
        }
        const message = JSON.parse(data)

        // 根据消息类型处理
        switch (message.type) {
          case 'chat':
            // 模拟消息处理流程
            // send({ type: 'status', status: 'processing', message: '开始处理...' })
            send({ type: 'status', status: 'processing', message: completeThinkingProcess })

            // 发送完成消息
            await sleep(100)
            // send({ type: 'complete', message: '处理完成', timestamp: Date.now() })
            break

          case 'think':
            // 处理思考类型消息
            send({ type: 'think_start', status: 'thinking' })

            // 模拟思考过程
            for (let i = 0; i < 5; i++) {
              await sleep(150)
              send({
                type: 'think_progress',
                step: i + 1,
                message: `思考步骤 ${i + 1}`,
                progress: ((i + 1) / 5) * 100,
              })
            }

            send({ type: 'think_end', conclusion: '思考完成' })
            break

          default:
            send({ type: 'error', message: '未知消息类型' })
        }
      } catch (error) {
        console.error('消息解析错误:', error)
        send({ type: 'error', message: '消息格式错误' })
      }
    })

    // 处理连接关闭
    client.addEventListener('close', () => {
      console.log('Client disconnected')
    })
  }),

  // 可选的HTTP接口
  http.post('/api/message', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({
      success: true,
      message: '消息已接收',
      data: body,
    })
  }),
]

export const worker = setupWorker(...handlers)
