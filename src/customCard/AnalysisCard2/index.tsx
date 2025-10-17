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
import { Radar, Line } from 'react-chartjs-2'
import './index.less'
import GeneratingDoc from '../ThinkCard/img/GeneratingDoc.svg'
import Company from './img/company.svg'
import Thinking from '../ThinkCard/img/Thinking.svg'
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
            <div className="view-profile">
              <a href="#">
                查看简介 <i className="fa fa-angle-right ml-1"></i>
              </a>
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
          productRateChartData={data.productRateChartData}
          chartOptions={data.chartOptions}
        />

        {/* 改进建议 */}
        <ImprovementSuggestions data={reportData.improvementSuggestions} />

        {/* 报告下载 */}
        <ReportDownload />
      </div>
    </div>
  )
}

// 风险速览组件
// const RiskOverview = ({ data, expandedSections, onToggleSection }) => (
//   <section className="report-card risk-overview">
//     <div className="section-header">
//       <h3 className="section-title">风险速览</h3>
//       <span className="risk-count">共发现{data.totalRisks}项风险</span>
//     </div>

//     <div className="risk-categories-grid">
//       {data.riskCategories.map((category) => (
//         <div key={category.id} className="risk-category-card">
//           <div className="category-main" onClick={() => onToggleSection(`${category.id}-content`)}>
//             <div className="category-left">
//               <div className={riskConfig[category.type].colorClass}></div>
//               <span className="category-name">{category.name}</span>
//             </div>
//             <div className="category-right">
//               <span className="count">{category.count}项</span>
//               <i
//                 className={`fa fa-angle-down expand-icon ${expandedSections[`${category.id}-content`] ? 'rotated' : ''}`}
//               ></i>
//             </div>
//           </div>

//           {expandedSections[`${category.id}-content`] && (
//             <div className="risk-items-container">
//               {category.items.map((item, itemIndex) => (
//                 <div key={itemIndex} className="risk-item-card">
//                   <div className="risk-item-header">
//                     <p className="item-title">{item.title}</p>
//                     <span className="item-trend">{item.trend}</span>
//                   </div>
//                   <p className="item-description">{item.description}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   </section>
// )

// 风险详情组件
// const RiskDetails = ({ data, expandedSections, onToggleSection, productRateChartData, chartOptions }) => (
//   <section className="report-card risk-details">
//     <div className="details-header">
//       <h3 className="details-title">风险详情</h3>
//       <span className="indicators-count">共检查{data.totalIndicators}项指标</span>
//     </div>

//     {data.categories.map((category) => (
//       <div key={category.id} className="detail-category">
//         <div className="category-header" onClick={() => onToggleSection(`${category.id}-content`)}>
//           <h4 className="category-name">{category.name}</h4>
//           <div className="abnormal-count">
//             <span className="count">{category.abnormalCount}项异常</span>
//             <i
//               className={`fa fa-angle-down expand-icon ${expandedSections[`${category.id}-content`] ? 'rotated' : ''}`}
//             ></i>
//           </div>
//         </div>

//         {expandedSections[`${category.id}-content`] && (
//           <div className="indicators-container">
//             {category.indicators.map((indicator) => (
//               <div key={indicator.id} className="indicator">
//                 <div className="indicator-header">
//                   <p className="indicator-name">{indicator.name}</p>
//                   <span className={riskConfig[indicator.riskLevel].tagClass}>{indicator.riskLevelText}</span>
//                 </div>

//                 <div className="result-card">
//                   <p className="result-text" dangerouslySetInnerHTML={{ __html: indicator.result }}></p>
//                   <p className="score-range">{indicator.scoreRange}</p>
//                 </div>

//                 {indicator.aiSuggestion && (
//                   <div className="ai-suggestion">
//                     <div className="suggestion-header">
//                       <i className="suggestion-icon fa fa-lightbulb-o"></i>
//                       <span className="suggestion-title">AI建议</span>
//                     </div>
//                     <p className="suggestion-text">{indicator.aiSuggestion}</p>
//                   </div>
//                 )}

//                 {indicator.showChart && (
//                   <div className="chart-section">
//                     <p className="chart-title">
//                       <i className="chart-icon fa fa-bar-chart"></i>
//                       {indicator.chartTitle}
//                     </p>
//                     <div className="chart-container">
//                       <Line data={productRateChartData} options={chartOptions} />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     ))}
//   </section>
// )

// 改进建议组件
// const ImprovementSuggestions = ({ data }) => (
//   <section className="report-card improvement-suggestions">
//     <h3 className="suggestions-header">
//       <i className="suggestions-icon fa fa-list-ul"></i>
//       改进建议
//     </h3>

//     <div className="suggestions-list">
//       {data.suggestions.map((suggestion, index) => (
//         <div key={index} className="suggestion-item">
//           <p className="suggestion-title">
//             <i className={`title-icon fa fa-${suggestion.icon}`}></i>
//             {suggestion.title}
//           </p>
//           <p className="suggestion-description">{suggestion.description}</p>
//         </div>
//       ))}
//     </div>
//   </section>
// )

// 报告下载组件
// const ReportDownload = () => (
//   <section className="report-card report-download">
//     <p className="download-description">已经为您生成一份供应商详细报告</p>

//     <div className="download-card">
//       <div className="file-info">
//         <div className="file-icon">
//           <i className="icon fa fa-file-text-o"></i>
//         </div>
//         <div className="file-details">
//           <p className="file-name">深圳德胜电子科技有限公司供应商风险报告</p>
//           <p className="file-meta">ASH AI 生成，仅供参考，请仔细甄别 隐私</p>
//         </div>
//       </div>
//       <button className="download-button">
//         <i className="download-icon fa fa-download"></i> 下载
//       </button>
//     </div>
//   </section>
// )

export default SupplierRiskReport
