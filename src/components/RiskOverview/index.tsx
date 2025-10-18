import { riskConfig } from '@/components'

export const RiskOverview = ({ data, expandedSections, onToggleSection }) => {
  return (
    <div className="report-card risk-overview">
      <div className="section-header">
        <h3 className="section-title">风险速览</h3>
        <span className="risk-count">共发现{data.totalRisks}项风险</span>
      </div>

      <div className="risk-categories">
        {data.riskCategories.map((category) => (
          <div key={category.id} className="risk-category">
            <div
              className={`category-header  ${riskConfig[category.type]?.bgClass || ''}`}
              onClick={() => onToggleSection(`${category.id}-content`)}
            >
              <div className="category-left">
                <div className={`color-indicator ${riskConfig[category.type]?.colorClass || ''}`}></div>
                <span className="category-name">{category.name}</span>
              </div>
              <div className="category-right">
                <span className="category-count">{category.count}项</span>
              </div>
            </div>

            {expandedSections[`${category.id}-content`] && (
              <div className="risk-items">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="risk-item">
                    <div className="risk-item-content">
                      <p className="item-title">{item.title}</p>
                      {item.trend && (
                        <span className={`item-trend ${item.trend.includes('上升') ? 'trend-up' : 'trend-down'}`}>
                          {item.trend}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
