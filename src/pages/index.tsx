import { useEffect } from 'react'
import { Outlet, request } from 'umi'
import { useStore } from '@/store'
import Loading from '@/components/Loading'
import changeTheme from '@/utils/changeTheme'
import { getMockData, getRecentAnalysis, getWsUrl } from '@/services'
import { ChatProProvider } from '@kdcloudjs/kdesign-chatui'
export default function Index() {
  const globalLoading = useStore((s) => s.globalLoading)

  // 在组件中添加调试
  useEffect(() => {
    const init = async () => {
      const wsMockData = await getRecentAnalysis()
      console.log('✅getMockData成功:', wsMockData)
      changeTheme({ color: '#276ff5' })
    }
    init()
  }, [])

  return (
    <ChatProProvider>
      {globalLoading && <Loading />}
      <Outlet />
    </ChatProProvider>
  )
}
