import { riskConfig } from '@/components'
import { Radar } from 'react-chartjs-2'
import Thinking from '../../customCard/ThinkCard/img/Thinking.svg'

export const RiskAssessment = (reportData) => {
  return (
    <div className="report-card risk-assessment">
      <div className="risk-assessment-header">
        <h3 className="section-title">整体风险评估洞察</h3>
        <div className="risk-level-tag">
          <div className={riskConfig[reportData.companyInfo.riskLevel].tagClass}>
            {reportData.companyInfo.riskLevelText}
          </div>
        </div>
      </div>

      <div>
        <div className="chart-container">
          <div className="radar-chart">
            <Radar data={reportData.radarChartData} options={reportData.radarChartOptions} />
          </div>
        </div>

        <div className="ai-interpretation">
          <div className="ai-header">
            <img src={Thinking}></img>
            <h4 className="ai-title">AI整体解读</h4>
          </div>
          <p className="ai-content">{reportData.riskAssessment.aiInterpretation}</p>

          <p className="key-findings">关键发现:</p>
          <ul className="findings-list">
            {reportData.riskAssessment.keyFindings.map((finding, index) => (
              <li key={index} className="finding-item">
                {finding}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
