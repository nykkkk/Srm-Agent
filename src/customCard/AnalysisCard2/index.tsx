import React, { useState } from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement as LineElement2,
  PointElement as PointElement2,
  Title,
} from 'chart.js'
import './index.less'
import GeneratingDoc from '../ThinkCard/img/GeneratingDoc.svg'
import Company from './img/company.svg'
import { Popup } from 'kdesign-mobile'
import { RiskAssessment } from '@/components/RiskAssessment'
import { RiskDetails } from '@/components/RiskDetails'
import { RiskOverview } from '@/components/RiskOverview'
import { ReportDownload } from '@/components/ReportDownload'
import { ImprovementSuggestions } from '@/components/ImprovementSuggestion'

// 注册 Chart.js 组件
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement2,
  PointElement2,
  Title,
)

const riskConfig = {
  high: {
    tagClass: 'risk-tag high-risk',
    colorClass: 'risk-indicator high-risk',
    borderClass: 'risk-border high-risk',
  },
  medium: {
    tagClass: 'risk-tag medium-risk',
    colorClass: 'risk-indicator medium-risk',
    borderClass: 'risk-border medium-risk',
  },
  low: {
    tagClass: 'risk-tag low-risk',
    colorClass: 'risk-indicator low-risk',
    borderClass: 'risk-border low-risk',
  },
  normal: {
    tagClass: 'risk-tag normal-risk',
    colorClass: 'risk-indicator normal-risk',
    borderClass: 'risk-border normal-risk',
  },
}

const SupplierRiskReport = ({ data }) => {
  console.log('RiskReportData', data)
  const [isShowPopup, setIsShowPopup] = useState(false)
  const reportData = data

  const [expandedSections, setExpandedSections] = useState({
    'high-risk-content': true,
    'medium-risk-content': false,
    'low-risk-content': false,
    'normal-content': false,
    'product-quality-content': true,
  })

  // 切换展开/折叠
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  return (
    <div className="supplier-risk-report">
      <div className="main-content">
        {/* 公司信息 */}
        <div className="report-card company-info">
          {/* 添加标题部分 */}
          <div className="report-title-section">
            <img src={GeneratingDoc}></img>
            <h1 className="report-title">供应商风险评估报告</h1>
          </div>

          <div className="company-header">
            <img src={Company}></img>
            <div className="company-details">
              <h2 className="company-name">{reportData.companyInfo.companyName}</h2>
              <p className="registration-number">{reportData.companyInfo.registrationNumber}</p>
            </div>
          </div>

          <div className="tags-container">
            <div className="tags-group">
              {reportData.companyInfo.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="view-profile" onClick={() => setIsShowPopup(true)}>
              查看简介 &gt;
            </div>
          </div>

          <div className="company-stats">
            <div className="stat-item">
              <p className="stat-label">法定代表</p>
              <p className="stat-value">{reportData.companyInfo.legalRepresentative}</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">注册资本</p>
              <p className="stat-value">{reportData.companyInfo.registeredCapital}</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">成立日期</p>
              <p className="stat-value">{reportData.companyInfo.establishmentDate}</p>
            </div>
          </div>
        </div>
        <Popup
          placement="bottom"
          visible={isShowPopup}
          onClose={() => setIsShowPopup(false)}
          width="100%"
          closable={false}
        >
          <div className="popup-content">
            <div className="popup-header">
              <p className="popup-title">企业简介</p>
            </div>
            <div className="popup-body">
              <img src={Company} className="popuplogo"></img>
              <div className="popup-company-name">{reportData.companyInfo.companyName}</div>
              <p className="popup-content">{reportData.companyInfo.companyProfile}</p>
            </div>
            <div className="popup-tags">
              {reportData.companyInfo.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Popup>

        {/* 整体风险评估洞察 */}
        <RiskAssessment reportData={reportData}></RiskAssessment>

        {/* 风险速览 */}
        <RiskOverview
          data={reportData.riskOverview}
          expandedSections={expandedSections}
          onToggleSection={toggleSection}
        />

        {/* 风险详情 */}
        <RiskDetails
          data={reportData.riskDetails}
          expandedSections={expandedSections}
          onToggleSection={toggleSection}
        />

        {/* 改进建议 */}
        <ImprovementSuggestions data={reportData.improvementSuggestions} />

        {/* 报告下载 */}
        <ReportDownload data={reportData.reportData} />
      </div>
    </div>
  )
}

export default SupplierRiskReport
