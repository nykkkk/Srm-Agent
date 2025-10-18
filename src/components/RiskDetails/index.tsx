import { riskConfig } from '@/components'
import { Charts } from '../Charts'

export const RiskDetails = ({ data, expandedSections, onToggleSection }) => {
  console.log('进入RiskDetails组件', data)

  // SVG箭头图标组件
  const ExpandIcon = ({ isExpanded }) => (
    <svg
      className={`expand-icon ${isExpanded ? 'expanded' : 'collapsed'}`}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
    >
      {isExpanded ? (
        <path d="M10 8L6 4L2 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M4 4L8 6L4 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}
    </svg>
  )

  // 图表图标SVG
  const ChartIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 2v12h12V2H2zm10 10H4V4h8v8z" />
      <path d="M6 10V6h4v4H6z" />
    </svg>
  )

  // 建议图标SVG
  const SuggestionIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
      <path d="M8 4.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM7 9h2v4H7V9z" />
    </svg>
  )

  return (
    <div className="report-card risk-details">
      <div className="details-header">
        <h3 className="details-title">风险详情</h3>
        <span className="indicators-count">共检查{data.totalIndicators}项指标</span>
      </div>

      {data.categories.map((category) => {
        const isExpanded = expandedSections[`${category.id}-content`]
        return (
          <div key={category.id} className={`detail-category ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div
              className={`category-header ${isExpanded ? 'expanded' : 'collapsed'}`}
              onClick={() => onToggleSection(`${category.id}-content`)}
            >
              <h4 className="category-name">{category.name}</h4>
              <div className="abnormal-count">
                <div className="count">{category.abnormalCount}项异常</div>
                {/* 使用SVG箭头图标 */}
                <ExpandIcon isExpanded={isExpanded} />
              </div>
            </div>

            {isExpanded && (
              <div className="indicators-container">
                {category.indicators.map((indicator) => (
                  <div key={indicator.id} className="indicator">
                    <div className="indicator-header">
                      <p className="indicator-name">{indicator.name}</p>
                      <span className={riskConfig[indicator.riskLevel]?.tagClass || 'risk-tag'}>
                        {indicator.riskLevelText}
                      </span>
                    </div>

                    <div className="result-card">
                      <p className="result-text" dangerouslySetInnerHTML={{ __html: indicator.result }}></p>
                    </div>

                    {indicator.showChart && (
                      <div className="chart-section">
                        <p className="chart-title">
                          <span className="chart-icon">
                            <ChartIcon />
                          </span>
                          {indicator.chartTitle}
                        </p>
                        <p className="score-range">{indicator.dataRange}</p>
                        <div className="chart-container">
                          <Charts data={indicator.echarts}></Charts>
                        </div>
                      </div>
                    )}

                    {indicator.aiSuggestion && (
                      <div className="ai-suggestion">
                        <div className="suggestion-header">
                          <span className="suggestion-icon">
                            <SuggestionIcon />
                          </span>
                          <span className="suggestion-title">AI建议</span>
                        </div>
                        <p className="suggestion-text">{indicator.aiSuggestion}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
