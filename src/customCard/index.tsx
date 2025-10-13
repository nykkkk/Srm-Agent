import React, { ReactNode } from 'react'
import ThinkCard from './ThinkCard'

import { C_THINK } from '@/constant'

export const customerCardRender = (data: any, _: any): ReactNode => {
  switch (data?.type) {
    case C_THINK:
      return <ThinkCard key={data.type} {...data} />
    default:
      return <></>
  }
}
