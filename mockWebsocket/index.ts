import { sleep } from '@/utils'
import { ws, http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { mockData, mockThinkCard, mockThinkCardStream, mockHtml, mockHtml1 } from './mockSocketData'
import { C_HTML, C_THINK } from '@/constant'

const chat = ws.link('wss://chat.example.com')

const handlers = [
  chat.addEventListener('connection', ({ client }) => {
    client.addEventListener('message', async (event) => {
      console.log('mock receive message：', event.data)

      const send = (m: any) => client.send(JSON.stringify(m))

      if (event.data !== 'ping') {
        for (const { message } of mockThinkCardStream) {
          /* eslint-disable-next-line no-await-in-loop */
          await sleep(100)
          client.send(JSON.stringify({ status: C_THINK, message }))
        }
        // for (const { message } of mockThinkCard) {
        //   /* eslint-disable-next-line no-await-in-loop */
        //   await sleep(1000)
        //   client.send(JSON.stringify({ status: C_THINK, message }))
        // }
        // send({ message: 'start', status: 'start' })
        send({
          status: C_HTML,
          message: mockHtml1,
        })
        // for (let i = 0; i < 5; i++) {
        //   send({ message: '12347', status: 'append' })
        // }
        // send({ message: mockData, status: 'end' })
        // await sleep(100)
        // send({ message: 'end', status: 'end' })
      }
    })
  }),
]

export const worker = setupWorker(...handlers)
