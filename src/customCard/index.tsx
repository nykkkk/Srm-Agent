import React, { ReactNode } from 'react'
import ThinkCard from './ThinkCard'
import { AutoHeightIframe } from './HtmlCard'
import SupplierRiskReportViewer from './AnalysisCard'
import SupplierRiskReport from './AnalysisCard2'
import { C_HTML, C_THINK, C_ANALYSIS } from '@/constant'

export const customerCardRender = (data: any, _: any): ReactNode => {
  switch (data?.type) {
    case C_THINK:
      return <ThinkCard key={data.type} {...data} />
    case C_HTML:
      console.log('进入HTMLCard')
      return <AutoHeightIframe html={data.content} />
    case C_ANALYSIS:
      console.log('进入AnalysisCard')
      return <SupplierRiskReport data={data.content} />
    default:
      return <></>
  }
}
