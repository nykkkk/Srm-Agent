import changeTheme from '@/utils/changeTheme'
import { useEffect, useState } from 'react'
import { Outlet } from 'umi'
import { getMockData, getRecentAnalysis, getWsUrl } from '@/services'
import { useStore } from '@/store'

export default function Layout() {
  // const wUrl = useStore((s) => s.wsUrl)
  const setWsUrl = (value: string) => useStore.getState().setWsUrl(value)
  const [isInitialized, setIsInitialized] = useState(false)
  useEffect(() => {
    const init = async () => {
      try {
        const wsData = await getWsUrl()
        setWsUrl(wsData[0].data.wsUrl)
        setIsInitialized(true)
        console.log('初始化成功')
      } catch (error) {
        console.error('获取ws失败', error)
      }
    }
    init()
  }, [])
  return isInitialized ? <Outlet /> : null
}
