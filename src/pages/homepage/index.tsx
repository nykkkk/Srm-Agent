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
  // Mock 历史搜索数据
  const [searchHistory, setSearchHistory] = useState<string[]>([
    '深圳德胜电子科技有限公司',
    '华为技术有限公司',
    '腾讯科技',
    '阿里巴巴集团',
    '字节跳动',
  ])
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [showBackArrow, setShowBackArrow] = useState(false)
  const [hasSearchResults, setHasSearchResults] = useState(false)
  const [isFromHistory, setIsFromHistory] = useState(false) // 新增状态标记是否来自历史搜索
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

    // 添加到搜索历史
    if (message && !searchHistory.includes(message)) {
      const newHistory = [message, ...searchHistory.slice(0, 4)] // 最多保存5条
      setSearchHistory(newHistory)
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

    // 导航到chat页面
    chatProRef.startGenerateMessage(temp)
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
  }, [])

  // 处理搜索历史点击
  const handleHistoryClick = (companyName: string) => {
    setIsFromHistory(true) // 标记来自历史搜索
    useStore.getState().setInputValue(companyName)
    // 不触发模糊搜索，直接隐藏搜索结果
    setHasSearchResults(false)
  }

  // 处理输入框焦点变化
  const handleInputFocus = () => {
    setIsInputFocused(true)
    setShowBackArrow(true)
    setIsFromHistory(false) // 重置标记
  }

  const handleInputBlur = () => {
    // 延迟隐藏，以便点击操作可以完成
    setTimeout(() => {
      // 不在这里重置状态，只在点击返回箭头时重置
    }, 200)
  }

  // 处理返回箭头点击
  const handleBackClick = () => {
    setIsInputFocused(false)
    setShowBackArrow(false)
    setHasSearchResults(false)
    setIsFromHistory(false) // 重置标记
    useStore.getState().setInputValue('')
  }

  // 处理模糊搜索结果显示
  const handleSearchResultsShow = (hasResults: boolean) => {
    // 如果来自历史搜索，不显示搜索结果
    if (!isFromHistory) {
      setHasSearchResults(hasResults)
    }
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

  const home = (
    <div className="home-container">
      {/* 顶部导航 */}
      <div className="top-navigation">
        <div className="navigation-content">
          {showBackArrow && <ArrowLeftOutlined className="back-arrow" onClick={handleBackClick} />}
          <div className="navigation-title">采购智能风控智能体</div>
        </div>
      </div>

      {/* 右上方背景图片 */}
      <div className="top-right-background"></div>

      {/* 主内容区 */}
      <div className="main-content">
        {/* 欢迎语区域 - 只在初始状态显示 */}
        {!isInputFocused && (
          <div className="welcome-section">
            <div className="greeting-primary">Hi,</div>
            <div className="greeting-secondary">我是采购智能风控</div>
            <div className="greeting-description">敏捷赋能采购问题从洞见到解决</div>
          </div>
        )}

        <div className="search-container-area">
          <SearchInputWithDropdown
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onSelectSupplier={(supplier) => {
              console.log('选中供应商:', supplier)
              useStore.getState().setInputValue(supplier.companyName)
              // 选择供应商后应该显示开始分析按钮
              setHasSearchResults(false)
              setIsFromHistory(false) // 重置标记
            }}
            onSearch={(query) => {
              console.log('搜索关键词:', query)
              setIsFromHistory(false) // 重置标记
            }}
            onSearchResultsShow={handleSearchResultsShow}
            isInputFocused={isInputFocused}
            isFromHistory={isFromHistory} // 传递标记给搜索组件
          />
        </div>

        {/* 开始分析按钮 - 只在没有搜索结果显示时显示，或者来自历史搜索时也显示 */}
        {(!hasSearchResults || isFromHistory) && (
          <button onClick={() => onSend()} className="analysis-button">
            <RightOutlined className="button-icon" />
            <div className="button-text">开始分析</div>
          </button>
        )}

        {/* 历史搜索 - 只在输入框聚焦且没有模糊搜索结果时显示 */}
        {isInputFocused && searchHistory.length > 0 && !hasSearchResults && (
          <div className="search-history-section">
            <div className="history-title">历史搜索</div>
            <div className="history-tags">
              {searchHistory.map((history, index) => (
                <div key={index} className="history-tag" onClick={() => handleHistoryClick(history)}>
                  {history}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 最近分析 - 只在初始状态显示 */}
        {!isInputFocused && (
          <div className="recent-analysis">
            <div className="section-header">
              <div className="section-title">最近分析</div>
              {/* <div className="view-more">查看更多 {`>`}</div> */}
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
        )}
      </div>
    </div>
  )
  return hasChat || fileList.length > 0 ? null : home
}

export default Home
