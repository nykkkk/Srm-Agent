import { useEffect } from 'react'
import { Outlet, request } from 'umi'
import { useStore } from '@/store'
import Loading from '@/components/Loading'
import changeTheme from '@/utils/changeTheme'

import { ChatProProvider } from '@kdcloudjs/kdesign-chatui'
export default function Index() {
  const globalLoading = useStore((s) => s.globalLoading)

  return (
    <ChatProProvider>
      {globalLoading && <Loading />}
      <Outlet />
    </ChatProProvider>
  )
}
