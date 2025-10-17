import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom/server'
import SupplierRiskReportTemplate from './SupplierRiskReportTemplate'

const SupplierRiskReportViewer = () => {
  const [reportData, setReportData] = useState({
    title: '供应商风险详情',
    header: {
      title: '供应商风险详情',
    },
    companyInfo: {
      companyName: '深圳德胜电子科技有限公司',
      registrationNumber: '9110090113112221311',
      riskLevel: 'medium',
      riskLevelText: '中风险',
      tags: ['存续', '合作供应商', '战略供应商'],
      legalRepresentative: '王大锤',
      registeredCapital: '13637.9万',
      establishmentDate: '1995-01-23',
    },
    riskAssessment: {
      aiInterpretation:
        '该公司整体风险处于中等水平，在产品质量和经营风险方面表现较好，但在供应链和财务风险方面需要重点关注。',
      keyFindings: [
        '司法风险：近一年有1起未结案合同纠纷，涉及金额80万元。',
        '履约风险：近3个月交货准时率72%，低于合同约定的90%。',
        '财务风险：XXXXXXXXXXXXXXXXXX',
      ],
    },
    riskOverview: {
      totalRisks: 20,
      riskCategories: [
        {
          id: 'high-risk',
          name: '高风险',
          type: 'high',
          count: 10,
          defaultExpanded: true,
          items: [
            {
              title: '产品合格率',
              description: '最近一批次产品合格率为87%',
            },
            {
              title: '准时交货率',
              description: '近三个月平均延迟率12.5%，较上季度上升8个百分点',
            },
            {
              title: '订单交货周期',
              description: '近三个月平均延迟率12.5%，较上季度上升8个百分点',
            },
          ],
        },
        {
          id: 'medium-risk',
          name: '中风险',
          type: 'medium',
          count: 10,
          defaultExpanded: false,
          items: [],
        },
        {
          id: 'low-risk',
          name: '低风险',
          type: 'low',
          count: 10,
          defaultExpanded: false,
          items: [],
        },
        {
          id: 'normal',
          name: '正常',
          type: 'normal',
          count: 10,
          defaultExpanded: false,
          items: [],
        },
      ],
    },
    riskDetails: {
      totalIndicators: 31,
      categories: [
        {
          id: 'product-quality',
          name: '产品质量',
          abnormalCount: 1,
          indicators: [
            {
              id: 'product-rate',
              name: '产品合格率',
              riskLevel: 'high',
              riskLevelText: '高风险',
              result: '检查结果: 最近一批次产品合格率为<span class="font-medium">87%</span>',
              scoreRange: '分值范围: 0.8~0.95',
              aiSuggestion: '启动质量审核程序，要求供应商提交整改报告，并进行现场评估。',
              chartTitle: '产品合格率分析',
              chartData: {
                labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'],
                datasets: [
                  {
                    label: '合格率',
                    data: [300, 700, 900, 600, 500, 800],
                    borderColor: 'rgba(22, 93, 255, 1)',
                    backgroundColor: 'rgba(22, 93, 255, 0.1)',
                    tension: 0.3,
                    fill: true,
                  },
                ],
              },
            },
            {
              id: 'order-response',
              name: '订单响应周期',
              riskLevel: 'normal',
              riskLevelText: '正常',
              result: '检查结果: 从确认订单到发货的平均时间为0.5天，响应快',
              scoreRange: '分值范围: 0~3天',
            },
            {
              id: 'delivery-rate',
              name: '准时交货率',
              riskLevel: 'medium',
              riskLevelText: '中风险',
              result: '检查结果: 近三个月平均延迟率<span class="font-medium">12.5%</span>，较上季度上升8个百分点',
              scoreRange: '分值范围: 0.8~0.95',
              aiSuggestion: '启动质量审核程序，要求供应商提交整改报告，并进行现场评估。',
            },
          ],
        },
      ],
    },
    improvementSuggestions: {
      suggestions: [
        {
          icon: 'fa-link',
          title: '供应链优化',
          description: '拓展2-3家供应商，降低对一家供应商的依赖度，建立供应商评估体系。',
        },
        {
          icon: 'fa-money',
          title: '财务管理',
          description: '拓展2-3家供应商，降低对一家供应商的依赖度，建立供应商评估体系。',
        },
        {
          icon: 'fa-newspaper-o',
          title: '舆情监控',
          description: '拓展2-3家供应商，降低对一家供应商的依赖度，建立供应商评估体系。',
        },
      ],
    },
    reportDownload: {
      description: '已经为您生成一份供应商报告',
      fileName: '深圳德胜电子科技有限公司供应商风险报告',
      fileInfo: 'Markdown · 4MB',
    },
    charts: {
      radarChart: {
        labels: ['产品质量', '经营风险', '财务风险', '供应链', '舆情风险', '法律诉讼'],
        datasets: [
          {
            label: '风险值',
            data: [65, 55, 80, 85, 60, 70],
            backgroundColor: 'rgba(255, 125, 0, 0.2)',
            borderColor: 'rgba(255, 125, 0, 1)',
            pointBackgroundColor: 'rgba(255, 125, 0, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 125, 0, 1)',
          },
        ],
      },
      productRateChart: {
        labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'],
        datasets: [
          {
            label: '合格率',
            data: [95, 92, 89, 87, 90, 88], // 改为百分比数值
            borderColor: 'rgba(22, 93, 255, 1)',
            backgroundColor: 'rgba(22, 93, 255, 0.1)',
            tension: 0.3,
            fill: true,
          },
        ],
      },
    },
  })

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeHeight, setIframeHeight] = useState('800px')

  // 生成 HTML 字符串
  const htmlString = ReactDOM.renderToString(<SupplierRiskReportTemplate data={reportData} />)

  // 监听 iframe 内容高度变化
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document
        if (!iframeDocument) {
          console.log('无法访问 iframe 文档')
          return
        }
        const body = iframeDocument.body
        const html = iframeDocument.documentElement

        const height = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight,
        )

        setIframeHeight(`${height}px`)
      } catch (error) {
        console.log('无法访问 iframe 内容:', error)
      }
    }

    iframe.addEventListener('load', handleLoad)

    // 初始设置
    setTimeout(handleLoad, 100)

    return () => {
      iframe.removeEventListener('load', handleLoad)
    }
  }, [htmlString])

  // 更新数据的函数
  const updateCompanyName = (newName) => {
    setReportData((prev) => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        companyName: newName,
      },
    }))
  }

  const updateRiskLevel = (newLevel, newLevelText) => {
    setReportData((prev) => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        riskLevel: newLevel,
        riskLevelText: newLevelText,
      },
    }))
  }

  return (
    <div
      style={{
        flex: 1,
        overflow: 'auto',
        border: '1px solid #ddd',
        width: 'calc(100% + 32px)',
        marginLeft: '-16px',
      }}
    >
      <iframe
        ref={iframeRef}
        srcDoc={htmlString}
        style={{
          width: '100%',
          height: iframeHeight,
          border: 'none',
          minHeight: '800px',
        }}
        title="供应商风险报告"
        scrolling="no" // 禁用 iframe 内部滚动
      />
    </div>
  )
}

export default SupplierRiskReportViewer
