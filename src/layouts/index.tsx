import changeTheme from '@/utils/changeTheme'
import { useEffect, useState } from 'react'
import { Outlet } from 'umi'
import { getMockData, getRecentAnalysis, getWsUrl } from '@/services'
import { useStore } from '@/store'
import { getToken, getInitStore } from '@/services'
import { getHttpHeader } from '@/utils'

export default function Layout() {
  // const wUrl = useStore((s) => s.wsUrl)
  // const setWsUrl = (value: string) => useStore.getState().setWsUrl(value)
  const [isInitialized, setIsInitialized] = useState(false)
  const setWsUrl = (value: string) => useStore.getState().setWsUrl(value)

  useEffect(() => {
    const init = async () => {
      // useStore.getState().setToken('')
      // const InitStoreData = await getInitStore(getHttpHeader())
      // setWsUrl(InitStoreData.data.wsUrl)
      // if (useStore.getState().wsUrl) {
      //   setIsInitialized(true)
      // }
      // console.log('✅设置WebSocket成功:', useStore.getState().wsUrl)
      // // }
      // changeTheme({ color: '#276ff5' })

      const token = await getToken()
      console.log('✅getToken成功:', token)
      if (token.status === true) {
        useStore.getState().setToken(token.data.access_token)
        // useStore.getState().setToken('')
        const InitStoreData = await getInitStore(getHttpHeader())

        setWsUrl(InitStoreData.data.wsUrl)
        if (useStore.getState().wsUrl) {
          setIsInitialized(true)
        }
        console.log('✅设置WebSocket成功:', useStore.getState().wsUrl)
      }
      changeTheme({ color: '#276ff5' })
    }
    init()
  }, [])
  return isInitialized ? <Outlet /> : null
}
