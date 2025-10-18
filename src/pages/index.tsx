import { useEffect } from 'react'
import { Outlet, request } from 'umi'
import { useStore } from '@/store'
import Loading from '@/components/Loading'
import changeTheme from '@/utils/changeTheme'
import { getToken, getTestData } from '@/services'
import { ChatProProvider } from '@kdcloudjs/kdesign-chatui'
export default function Index() {
  const globalLoading = useStore((s) => s.globalLoading)

  // 在组件中添加调试
  useEffect(() => {
    const init = async () => {
      const token = await getToken()
      console.log('✅getToken成功:', token)
      if (token.status === true) {
        const test = {
          access_token: token.data.access_token,
        }
        const testData = await getTestData(test)
        console.log('✅getTestData成功:', testData)
      }
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
