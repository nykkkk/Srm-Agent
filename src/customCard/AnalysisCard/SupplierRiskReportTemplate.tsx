import React from 'react'
import ReactDOM from 'react-dom/server'

// 创建 HTML 模板组件
const SupplierRiskReportTemplate = ({ data }) => (
  <html lang="zh-CN">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{data.title || '供应商风险详情'}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js"></script>

      <script
        dangerouslySetInnerHTML={{
          __html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: '#165DFF',
                  highRisk: '#F53F3F',
                  mediumRisk: '#FF7D00',
                  lowRisk: '#00B42A',
                  normal: '#165DFF',
                  lightGray: '#F2F3F5',
                  cardGray: '#F7F8FA',
                },
                fontFamily: {
                  sans: ['Inter', 'system-ui', 'sans-serif'],
                },
                screens: {
                  'xs': '358px',
                }
              }
            }
          }
        `,
        }}
      />

      <style
        type="text/tailwindcss"
        dangerouslySetInnerHTML={{
          __html: `
          @layer utilities {
            .content-auto {
              content-visibility: auto;
            }
            .risk-tag {
              @apply text-xs px-2 py-0.5 rounded-full font-medium;
            }
            .card-shadow {
              @apply shadow-sm hover:shadow-md transition-shadow duration-200;
            }
            .expand-icon {
              @apply transition-transform duration-300;
            }
            .rotate-icon {
              @apply transform rotate-180;
            }
          }
          
          @media (max-width: 480px) {
            .responsive-grid {
              grid-template-columns: 1fr;
            }
            .responsive-text {
              font-size: 0.875rem;
            }
            .responsive-padding {
              padding: 1rem;
            }
          }
          
          .chart-container {
            position: relative;
            height: 200px;
            width: 100%;
          }
          
          @media (max-width: 360px) {
            .mobile-compact {
              padding: 0.75rem;
            }
            .mobile-text-sm {
              font-size: 0.8125rem;
            }
          }
        `,
        }}
      />
    </head>
    <body className="bg-gray-50 font-sans text-gray-800">
      <Header data={data.header} />
      <MainContent data={data} />
      <ScriptContent data={data} />
    </body>
  </html>
)

// 头部组件
const Header = ({ data }) => (
  <header className="bg-primary text-white p-4 relative">
    <button className="absolute left-4 top-1/2 transform -translate-y-1/2">
      <i className="fa fa-arrow-left"></i>
    </button>
    <h1 className="text-center font-medium text-lg sm:text-xl">{data?.title || '供应商风险详情'}</h1>
  </header>
)

// 主要内容组件
const MainContent = ({ data }) => (
  <main className="w-full px-3 sm:px-4 py-4 max-w-full">
    <CompanyInfo data={data.companyInfo} />
    <RiskAssessment data={data.riskAssessment} />
    <RiskOverview data={data.riskOverview} />
    <RiskDetails data={data.riskDetails} />
    <ImprovementSuggestions data={data.improvementSuggestions} />
    <ReportDownload data={data.reportDownload} />
  </main>
)

// 公司信息组件
const CompanyInfo = ({ data }) => (
  <section className="bg-white rounded-lg p-4 sm:p-5 mb-4 card-shadow">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
      <div className="flex-1 min-w-0">
        <h2 className="text-lg sm:text-xl font-semibold break-words">
          {data?.companyName || '深圳德胜电子科技有限公司'}
        </h2>
        <p className="text-gray-500 text-sm mt-1 break-all">{data?.registrationNumber || '9110090113112221311'}</p>
      </div>
      <span className={`risk-tag ${getRiskTagClass(data?.riskLevel)} self-start sm:self-auto`}>
        {data?.riskLevelText || '中风险'}
      </span>
    </div>

    <div className="flex flex-wrap gap-2 mb-4">
      {data?.tags?.map((tag, index) => (
        <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full whitespace-nowrap">
          {tag}
        </span>
      ))}
    </div>

    <div className="grid grid-cols-2 sm:flex sm:justify-between text-sm text-gray-600 border-t border-gray-100 pt-3 gap-3 sm:gap-0">
      <div className="text-center sm:text-left">
        <p className="text-gray-500 text-xs sm:text-sm">法定代表</p>
        <p className="text-sm font-medium">{data?.legalRepresentative || '王大锤'}</p>
      </div>
      <div className="text-center sm:text-left">
        <p className="text-gray-500 text-xs sm:text-sm">注册资本</p>
        <p className="text-sm font-medium">{data?.registeredCapital || '13637.9万'}</p>
      </div>
      <div className="text-center sm:text-left col-span-2 sm:col-auto">
        <p className="text-gray-500 text-xs sm:text-sm">成立日期</p>
        <p className="text-sm font-medium">{data?.establishmentDate || '1995-01-23'}</p>
      </div>
      <div className="text-primary hidden sm:block">
        <a href="#" className="flex items-center text-sm">
          查看简介 <i className="fa fa-angle-right ml-1"></i>
        </a>
      </div>
    </div>

    <div className="sm:hidden text-primary mt-3 pt-3 border-t border-gray-100">
      <a href="#" className="flex items-center justify-center text-sm">
        查看简介 <i className="fa fa-angle-right ml-1"></i>
      </a>
    </div>
  </section>
)

// 风险评估组件
const RiskAssessment = ({ data }) => (
  <section className="bg-white rounded-lg p-4 sm:p-5 mb-4 card-shadow">
    <h3 className="text-lg font-semibold mb-4">整体风险评估洞察</h3>

    <div className="flex justify-center mb-6">
      <div className="w-48 h-48 sm:w-64 sm:h-64 relative">
        <canvas id="riskRadarChart" width="256" height="256" style={{ display: 'block' }}></canvas>
      </div>
    </div>

    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
      <div className="flex items-center mb-2">
        <i className="fa fa-lightbulb-o text-primary mr-2"></i>
        <h4 className="font-medium text-sm sm:text-base">AI整体解读</h4>
      </div>
      <p className="text-xs sm:text-sm mb-3 leading-relaxed">
        {data?.aiInterpretation ||
          '该公司整体风险处于中等水平，在产品质量和经营风险方面表现较好，但在供应链和财务风险方面需要重点关注。'}
      </p>

      <p className="text-xs sm:text-sm font-medium mb-1">关键发现:</p>
      <ul className="text-xs sm:text-sm text-gray-700 list-disc pl-4 space-y-1 mb-3">
        {data?.keyFindings?.map((finding, index) => (
          <li key={index} className="leading-relaxed">
            {finding}
          </li>
        ))}
      </ul>

      <a href="#" className="text-primary text-xs sm:text-sm flex items-center">
        查看完整分析 <i className="fa fa-angle-right ml-1"></i>
      </a>
    </div>
  </section>
)

// 风险速览组件
const RiskOverview = ({ data }) => (
  <section className="bg-white rounded-lg p-4 sm:p-5 mb-4 card-shadow">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">风险速览</h3>
      <span className="text-xs sm:text-sm text-gray-500">共{data?.totalRisks || 20}项风险</span>
    </div>

    {data?.riskCategories?.map((category, index) => (
      <RiskCategory key={index} category={category} />
    ))}
  </section>
)

// 风险分类组件
const RiskCategory = ({ category }) => (
  <div className="mb-4">
    <div
      className="flex justify-between items-center cursor-pointer risk-section-header"
      data-target={`${category.id}-content`}
    >
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full ${getRiskColorClass(category.type)} mr-2`}></div>
        <span className="font-medium text-sm sm:text-base">{category.name}</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-500 text-xs sm:text-sm mr-2">{category.count}项</span>
        <i className="fa fa-angle-down expand-icon text-sm"></i>
      </div>
    </div>

    <div
      id={`${category.id}-content`}
      className={`mt-3 pl-4 sm:pl-5 border-l-2 ${getRiskBorderClass(category.type)} space-y-3 ${category.defaultExpanded ? '' : 'hidden'}`}
    >
      {category.items?.map((item, itemIndex) => (
        <div key={itemIndex} className={`p-3 ${getRiskBgClass(category.type)} rounded-lg`}>
          <p className="font-medium text-sm">{item.title}</p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
)

// 风险详情组件
const RiskDetails = ({ data }) => (
  <section className="bg-white rounded-lg p-4 sm:p-5 mb-4 card-shadow">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold">全部风险详情</h3>
      <span className="text-xs sm:text-sm text-gray-500">共{data?.totalIndicators || 31}项指标</span>
    </div>

    {data?.categories?.map((category, index) => (
      <RiskDetailCategory key={index} category={category} />
    ))}
  </section>
)

// 风险详情分类组件
const RiskDetailCategory = ({ category }) => (
  <div className="mb-6">
    <div
      className="flex justify-between items-center cursor-pointer detail-section-header"
      data-target={`${category.id}-content`}
    >
      <h4 className="font-medium text-sm sm:text-base">{category.name}</h4>
      <div className="flex items-center">
        <span className="text-xs sm:text-sm text-gray-500 mr-2">{category.abnormalCount}项异常</span>
        <i className="fa fa-angle-down expand-icon text-sm rotate-icon"></i>
      </div>
    </div>

    <div id={`${category.id}-content`} className="mt-4 space-y-4 sm:space-y-6">
      {category.indicators?.map((indicator, idx) => (
        <RiskIndicator key={idx} indicator={indicator} />
      ))}
    </div>
  </div>
)

// 风险指标组件
const RiskIndicator = ({ indicator }) => (
  <div>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
      <p className="font-medium text-sm sm:text-base">{indicator.name}</p>
      <span className={`risk-tag ${getRiskTagClass(indicator.riskLevel)} self-start`}>{indicator.riskLevelText}</span>
    </div>

    <div className="bg-gray-50 p-3 rounded-lg mb-3">
      <p className="text-xs sm:text-sm mb-1" dangerouslySetInnerHTML={{ __html: indicator.result }}></p>
      <p className="text-xs sm:text-sm text-gray-600">{indicator.scoreRange}</p>
    </div>

    {indicator.aiSuggestion && (
      <div className="bg-blue-50 p-3 rounded-lg mb-4">
        <div className="flex items-center mb-1">
          <i className="fa fa-lightbulb-o text-primary mr-1 text-xs sm:text-sm"></i>
          <span className="text-xs sm:text-sm font-medium">AI建议</span>
        </div>
        <p className="text-xs sm:text-sm">{indicator.aiSuggestion}</p>
      </div>
    )}

    {indicator.chartData && (
      <div>
        <p className="text-xs sm:text-sm font-medium mb-2 flex items-center">
          <i className="fa fa-bar-chart text-gray-500 mr-1 text-xs"></i>
          {indicator.chartTitle}
        </p>
        <div className="chart-container">
          <canvas id="productRateChart" width="400" height="200" style={{ display: 'block' }}></canvas>
        </div>
      </div>
    )}
  </div>
)

// 改进建议组件
const ImprovementSuggestions = ({ data }) => (
  <section className="bg-white rounded-lg p-4 sm:p-5 mb-4 card-shadow">
    <h3 className="text-lg font-semibold mb-4 flex items-center">
      <i className="fa fa-list-ul text-primary mr-2"></i>
      改进建议
    </h3>

    <div className="space-y-3 sm:space-y-4">
      {data?.suggestions?.map((suggestion, index) => (
        <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <p className="font-medium text-primary text-sm sm:text-base mb-2 flex items-center">
            <i className={`fa ${suggestion.icon} mr-2`}></i>
            {suggestion.title}
          </p>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{suggestion.description}</p>
        </div>
      ))}
    </div>
  </section>
)

// 报告下载组件
const ReportDownload = ({ data }) => (
  <section className="bg-white rounded-lg p-4 sm:p-5 mb-4 card-shadow">
    <p className="text-xs sm:text-sm text-gray-500 mb-3">{data?.description || '已经为您生成一份供应商报告'}</p>

    <div className="border border-gray-200 rounded-lg p-3 sm:p-4 flex items-center justify-between">
      <div className="flex items-center min-w-0 flex-1">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded flex items-center justify-center text-primary mr-2 sm:mr-3 flex-shrink-0">
          <i className="fa fa-file-text-o text-sm sm:text-lg"></i>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium truncate">
            {data?.fileName || '深圳德胜电子科技有限公司供应商风险报告'}
          </p>
          <p className="text-xs text-gray-500">{data?.fileInfo || 'Markdown · 4MB'}</p>
        </div>
      </div>
      <button className="text-primary text-xs sm:text-sm flex items-center whitespace-nowrap ml-2">
        <i className="fa fa-download mr-1"></i> 下载
      </button>
    </div>
  </section>
)

// JavaScript 脚本组件
// JavaScript 脚本组件
const ScriptContent = ({ data }) => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
      // 等待所有资源加载完成
      window.addEventListener('load', function() {
        // 延迟执行，确保 Chart.js 已加载
        setTimeout(initializeCharts, 100);
      });

      function initializeCharts() {
        try {
          // 初始化雷达图
          const radarCanvas = document.getElementById('riskRadarChart');
          if (radarCanvas) {
            const radarCtx = radarCanvas.getContext('2d');
            const riskRadarChart = new Chart(radarCtx, {
              type: 'radar',
              data: {
                labels: ['产品质量', '经营风险', '财务风险', '供应链', '舆情风险', '法律诉讼'],
                datasets: [{
                  label: '风险值',
                  data: [65, 55, 80, 85, 60, 70],
                  backgroundColor: 'rgba(255, 125, 0, 0.2)',
                  borderColor: 'rgba(255, 125, 0, 1)',
                  pointBackgroundColor: 'rgba(255, 125, 0, 1)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgba(255, 125, 0, 1)'
                }]
              },
              options: {
                scales: {
                  r: {
                    angleLines: {
                      display: true,
                      color: 'rgba(0, 0, 0, 0.1)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                      display: false
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }
            });
          }

          // 初始化产品合格率图表
          const productRateCanvas = document.getElementById('productRateChart');
          if (productRateCanvas) {
            const productRateCtx = productRateCanvas.getContext('2d');
            const productRateChart = new Chart(productRateCtx, {
              type: 'line',
              data: {
                labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'],
                datasets: [{
                  label: '合格率',
                  data: [95, 92, 89, 87, 90, 88],
                  borderColor: 'rgba(22, 93, 255, 1)',
                  backgroundColor: 'rgba(22, 93, 255, 0.1)',
                  tension: 0.3,
                  fill: true
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 80,
                    max: 100,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                      callback: function(value) {
                        return value + '%';
                      }
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return '合格率: ' + context.parsed.y + '%';
                      }
                    }
                  }
                }
              }
            });
          }
        } catch (error) {
          console.error('图表初始化错误:', error);
        }
      }

      document.addEventListener('DOMContentLoaded', function() {
        // 风险速览区域的展开/折叠功能
        const riskSectionHeaders = document.querySelectorAll('.risk-section-header');
        riskSectionHeaders.forEach(header => {
          header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const icon = this.querySelector('.expand-icon');
            
            if (targetContent && icon) {
              targetContent.classList.toggle('hidden');
              icon.classList.toggle('rotate-icon');
            }
          });
        });
        
        // 全部风险详情区域的展开/折叠功能
        const detailSectionHeaders = document.querySelectorAll('.detail-section-header');
        detailSectionHeaders.forEach(header => {
          header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const icon = this.querySelector('.expand-icon');
            
            if (targetContent && icon) {
              targetContent.classList.toggle('hidden');
              icon.classList.toggle('rotate-icon');
            }
          });
        });
      });
    `,
    }}
  />
)

// 辅助函数
const getRiskTagClass = (riskLevel) => {
  switch (riskLevel) {
    case 'high':
      return 'bg-highRisk/10 text-highRisk'
    case 'medium':
      return 'bg-mediumRisk/10 text-mediumRisk'
    case 'low':
      return 'bg-lowRisk/10 text-lowRisk'
    default:
      return 'bg-normal/10 text-normal'
  }
}

const getRiskColorClass = (riskType) => {
  switch (riskType) {
    case 'high':
      return 'bg-highRisk'
    case 'medium':
      return 'bg-mediumRisk'
    case 'low':
      return 'bg-lowRisk'
    default:
      return 'bg-normal'
  }
}

const getRiskBorderClass = (riskType) => {
  switch (riskType) {
    case 'high':
      return 'border-highRisk/30'
    case 'medium':
      return 'border-mediumRisk/30'
    case 'low':
      return 'border-lowRisk/30'
    default:
      return 'border-normal/30'
  }
}

const getRiskBgClass = (riskType) => {
  switch (riskType) {
    case 'high':
      return 'bg-red-50'
    case 'medium':
      return 'bg-orange-50'
    case 'low':
      return 'bg-green-50'
    default:
      return 'bg-blue-50'
  }
}

export default SupplierRiskReportTemplate
