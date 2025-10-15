import React, { ReactNode } from 'react'
import ThinkCard from './ThinkCard'
import { AutoHeightIframe } from './HtmlCard'
import { C_HTML, C_THINK } from '@/constant'

export const customerCardRender = (data: any, _: any): ReactNode => {
  console.log('datatype', data?.type)

  switch (data?.type) {
    case C_THINK:
      return <ThinkCard key={data.type} {...data} />
    case C_HTML:
      console.log('进入HTMLCard')
      return <AutoHeightIframe html={data.content} />
    default:
      return <></>
  }
}
