import { riskConfig } from '@/components'
export const RiskOverview = ({ data, expandedSections, onToggleSection }) => {
  return (
    <div className="report-card risk-overview">
      <div className="section-header">
        <h3 className="section-title">风险速览</h3>
        <span className="risk-count">共发现{data.totalRisks}项风险</span>
      </div>

      <div className="risk-categories-grid">
        {data.riskCategories.map((category) => (
          <div key={category.id} className="risk-category-card">
            <div className="category-main" onClick={() => onToggleSection(`${category.id}-content`)}>
              <div className="category-left">
                <div className={riskConfig[category.type].colorClass}></div>
                <span className="category-name">{category.name}</span>
              </div>
              <div className="category-right">
                <span className="count">{category.count}项</span>
                <i
                  className={`fa fa-angle-down expand-icon ${expandedSections[`${category.id}-content`] ? 'rotated' : ''}`}
                ></i>
              </div>
            </div>

            {expandedSections[`${category.id}-content`] && (
              <div className="risk-items-container">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="risk-item-card">
                    <div className="risk-item-header">
                      <p className="item-title">{item.title}</p>
                      <span className="item-trend">{item.trend}</span>
                    </div>
                    <p className="item-description">{item.description}</p>
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
