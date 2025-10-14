import React, { useState, useRef, useEffect } from 'react'
import type { FC } from 'react'
import { useNavigate } from 'umi'
import { Toast, TextArea } from 'kdesign-mobile'
import { ArrowLeftOutlined, ShareAltOutlined, EyeOutlined, RightOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { BaseMessage, ChatMessage, useChatPro } from '@kdcloudjs/kdesign-chatui'
import './index.less'
import { useStore } from '@/store'
import { getRecentAnalysis } from '@/services'
import { C_FILE } from '@/constant'
import SearchInputWithDropdown from '@/components/Search'

const Home: FC = () => {
  const navigate = useNavigate()
  const textareaRef = useRef<any>(null)
  const [recentAnalysis, setRecentAnalysis] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const disabled = loading
  const inputValue = useStore((s) => s.inputValue)
  const fileList = useStore((s) => s.fileList)
  const fileDoneList = (fileList || []).filter((d) => d.status === 'done')
  const locale = useStore((s) => s.locale)
  const hasChat = useStore((s) => s.hasChat)

  const chatProRef = useChatPro()

  const onSend = (v = undefined) => {
    if (disabled) return null

    const message = v ?? (inputValue || '')
    console.log('send message', message)

    if (!message && fileDoneList.length <= 0) {
      Toast.show({ content: locale('chat.inputEmpty'), duration: 2000 })
      return
    }

    const temp: BaseMessage = [{ type: 'user', msg: [] }]
    if (message) {
      temp[0].msg.push({ type: 'markdown', content: message })
    }

    if (fileDoneList.length > 0) {
      const content: ChatMessage['msg'] = []
      fileDoneList.forEach((f, i) => {
        content.push({ id: f.uid, name: f.name, type: f.type, url: f?.response.url, size: f.size })
      })
      temp[0].msg.push({ type: C_FILE, content })
    }
    // console.log(temp)

    // 导航到chat页面
    chatProRef.startGenerateMessage(temp)
    // navigate('/chat')
    setTimeout(() => {
      useStore.getState().setInputValue('')
      textareaRef.current?.blur()
      useStore.getState().setFileList([])
      useStore.getState().setShowUpload(false)
    }, 20)
  }

  // 使用useEffect在组件加载时获取数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await getRecentAnalysis()
        console.log('获取最近分析数据成功:', res)
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
  const home = (
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

        <div className="search-container-area">
          <SearchInputWithDropdown
            onSelectSupplier={(supplier) => {
              console.log('选中供应商:', supplier)
              // 可以在这里设置输入值或执行其他操作
              useStore.getState().setInputValue(supplier.companyName)
            }}
            onSearch={(query) => {
              console.log('搜索关键词:', query)
              // 可以在这里执行搜索相关操作
            }}
          />
        </div>

        {/* 开始分析按钮 */}
        <button onClick={() => onSend()} className="analysis-button">
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
  return hasChat || fileList.length > 0 ? null : home
}

export default Home
