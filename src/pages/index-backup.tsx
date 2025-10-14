import { useEffect } from 'react'
import { Outlet } from 'umi'
import { useStore } from '@/store'
import Loading from '@/components/Loading'
import changeTheme from '@/utils/changeTheme'
import { getMockData } from '@/services'
import React from 'react'
import { WebSocketMessage, useWebSocket } from '@/services/connect'
import { WebSocketProvider } from '@/services/WebSocketContext'
export default function Index() {
  const globalLoading = useStore((s) => s.globalLoading)

  useEffect(() => {
    getMockData().then((res) => {
      console.log('mock data loaded', res)
    })

    changeTheme({ color: '#276ff5' })
  }, [])

  return (
    <WebSocketProvider
      url="wss://your-websocket-server.com"
      pingInterval={10000}
      reconnect={true}
      reconnectInterval={3000}
    >
      {globalLoading && <Loading />}
      <Outlet />
    </WebSocketProvider>
  )
}
