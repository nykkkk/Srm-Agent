import { getMockData } from '@/services'
import changeTheme from '@/utils/changeTheme'
import { useEffect } from 'react'
import { Outlet } from 'umi'

export default function Layout() {
  return <Outlet />
}
