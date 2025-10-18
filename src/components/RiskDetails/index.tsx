import { riskConfig } from '@/components'
import { Line } from 'react-chartjs-2'
import { Charts } from '../Charts'

export const RiskDetails = ({ data, expandedSections, onToggleSection, productRateChartData, chartOptions }) => {
  console.log('进入RiskDetails组件', data)

  return (
    <section className="report-card risk-details">
      <div className="details-header">
        <h3 className="details-title">风险详情</h3>
        <span className="indicators-count">共检查{data.totalIndicators}项指标</span>
      </div>

      {data.categories.map((category) => (
        <div key={category.id} className="detail-category">
          <div className="category-header" onClick={() => onToggleSection(`${category.id}-content`)}>
            <h4 className="category-name">{category.name}</h4>
            <div className="abnormal-count">
              <div className="count">{category.abnormalCount}项异常</div>
            </div>
          </div>

          {expandedSections[`${category.id}-content`] && (
            <div className="indicators-container">
              {category.indicators.map((indicator) => (
                <div key={indicator.id} className="indicator">
                  <div className="indicator-header">
                    <p className="indicator-name">{indicator.name}</p>
                    <span className={riskConfig[indicator.riskLevel].tagClass}>{indicator.riskLevelText}</span>
                  </div>

                  <div className="result-card">
                    <p className="result-text" dangerouslySetInnerHTML={{ __html: indicator.result }}></p>
                  </div>

                  {indicator.showChart && (
                    <div className="chart-section">
                      <p className="chart-title">
                        <i className="chart-icon fa fa-bar-chart"></i>
                        {indicator.chartTitle}
                      </p>
                      <p className="score-range">{indicator.dataRange}</p>
                      <div className="chart-container">
                        <Charts data={indicator.echarts}></Charts>
                      </div>
                    </div>
                  )}

                  {/*  表格数据未处理 */}

                  {indicator.aiSuggestion && (
                    <div className="ai-suggestion">
                      <div className="suggestion-header">
                        <i className="suggestion-icon fa fa-lightbulb-o"></i>
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
      ))}
    </section>
  )
}
