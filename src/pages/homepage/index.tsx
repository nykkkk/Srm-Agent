import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { useNavigate } from 'umi'
import { ArrowLeftOutlined, ShareAltOutlined, EyeOutlined, RightOutlined, ArrowRightOutlined } from '@ant-design/icons'

import './index.less'
import { getRecentAnalysis } from '@/services'

const Home: FC = () => {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')
  const [recentAnalysis, setRecentAnalysis] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // 使用useEffect在组件加载时获取数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await getRecentAnalysis()
        // 检查响应是否有效并更新状态
        if (res && Array.isArray(res)) {
          setRecentAnalysis(res)
        } else {
          console.log('获取数据失败，使用默认数据')
        }
      } catch (error) {
        console.error('获取最近分析数据失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, []) // 空依赖数组表示只在组件挂载时执行一次

  const handleStartAnalysis = () => {
    if (searchInput.trim()) {
      // 实际应用中可能会根据输入进行搜索或分析
      navigate('/procurement-risk', {
        state: {
          searchKeyword: searchInput,
        },
      })
    }
  }

  // 跳转到采购风险详情页
  const handleNavigateToProcurementRisk = () => {
    navigate('/procurement-risk', {
      state: {
        searchKeyword: searchInput,
      },
    })
  }

  const getRiskLevelText = (level: string) => {
    switch (level) {
      case 'high':
        return '高风险'
      case 'medium':
        return '中风险'
      case 'low':
        return '低风险'
      default:
        return '未知风险'
    }
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-red-500'
      case 'medium':
        return 'text-orange-500'
      case 'low':
        return 'text-green-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="home-container">
      {/* 顶部导航 */}
      <div className="top-navigation">
        <div className="navigation-content">
          <div className="navigation-title">采购智能风控智能体</div>
        </div>
      </div>

      {/* 右上方背景图片 */}
      <div className="top-right-background"></div>

      {/* 主内容区 */}
      <div className="main-content">
        {/* 欢迎语区域 */}
        <div className="welcome-section">
          <div className="greeting-primary">Hi,</div>
          <div className="greeting-secondary">我是采购智能风控</div>
          <div className="greeting-description">敏捷赋能采购问题从洞见到解决</div>
        </div>

        {/* 搜索框 */}
        <div className="search-container">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="请输入供应商名称/企业信用代码"
            className="search-input"
          />
        </div>

        {/* 开始分析按钮 */}
        <button onClick={handleStartAnalysis} className="analysis-button">
          <RightOutlined className="button-icon" />
          <div className="button-text">开始分析</div>
        </button>

        {/* 采购风险详情按钮 */}
        {/* <div className="risk-detail-button-container">
          <button className="risk-detail-button" onClick={handleNavigateToProcurementRisk}>
            查看采购风险详情
            <ArrowRightOutlined className="arrow-icon" />
          </button>
        </div> */}

        {/* 最近分析 */}
        <div className="recent-analysis">
          <div className="section-header">
            <div className="section-title">最近分析</div>
            <div className="view-more">查看更多 {`>`}</div>
          </div>

          <div className="analysis-list">
            {loading ? (
              <div className="loading-state">加载中...</div>
            ) : (
              recentAnalysis.map((item) => (
                <div key={item.id} className="analysis-card">
                  <div className="card-header">
                    <div className="company-info">
                      <div className="company-name">{item.companyName}</div>
                      <div className="credit-code">{item.creditCode}</div>
                    </div>
                    <div className={`risk-level ${getRiskLevelColor(item.riskLevel)}`}>
                      {getRiskLevelText(item.riskLevel)}
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className="card-footer">
                    <div className="analysis-date">{item.date}</div>
                    <div className="card-actions">
                      <ShareAltOutlined className="action-icon" />
                      <EyeOutlined className="action-icon" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
