import React, { useState, useRef, useEffect } from 'react'
import type { FC } from 'react'
import { Toast, TextArea } from 'kdesign-mobile'
import { ArrowLeftOutlined, ShareAltOutlined, EyeOutlined, RightOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { BaseMessage, ChatMessage, useChatPro } from '@kdcloudjs/kdesign-chatui'
import './index.less'
import { useStore } from '@/store'
import { getHistory, getRecentAnalysis } from '@/services'
import { C_FILE } from '@/constant'
import SearchInputWithDropdown from '@/components/Search'
import { getRiskLevelText, getRiskLevelColor } from '@/constant'
import AnalysisLogo from '@/assets/analysisLogo.png'
import { getHttpHeader } from '@/utils'
import { startAnalysis } from '@/services'

const Home: FC = () => {
  const textareaRef = useRef<any>(null)
  const [recentAnalysis, setRecentAnalysis] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  // Mock 历史搜索数据
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [hasSearchResults, setHasSearchResults] = useState(false)
  const [isFromHistory, setIsFromHistory] = useState(false)
  const [isFromSuggestion, setIsFromSuggestion] = useState(false)
  const disabled = loading
  const inputValue = useStore((s) => s.inputValue)
  const fileList = useStore((s) => s.fileList)
  const fileDoneList = (fileList || []).filter((d) => d.status === 'done')
  const locale = useStore((s) => s.locale)
  const hasChat = useStore((s) => s.hasChat)

  // 使用 ref 来跟踪选择状态，避免闭包问题
  const isSelectingRef = useRef(false)
  const blurTimeoutRef = useRef<NodeJS.Timeout>()

  // 动画状态
  const [showWelcome, setShowWelcome] = useState(true)
  const [showRecentAnalysis, setShowRecentAnalysis] = useState(true)
  const [showSearchHistory, setShowSearchHistory] = useState(false)
  const [isSearchBarMoved, setIsSearchBarMoved] = useState(false)

  const chatProRef = useChatPro()

  // 判断是否允许分析：只有当输入框的数据是从suggestion选择或历史搜索中点击的才可以点击
  const canAnalyze = isFromHistory || isFromSuggestion

  const onSend = async (v = undefined) => {
    if (disabled || !canAnalyze) return null

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

    try {
      const getAnalysis = async () => {
        const analysis = await startAnalysis(getHttpHeader())
        if (analysis.status) {
          console.log('获取think数据')
        } else {
          console.log('开始分析失败')
        }
      }
      getAnalysis()
    } catch (error) {
      console.log('连接websocket报错')
    }

    // 导航到chat页面
    chatProRef.startGenerateMessage(temp)
    setTimeout(() => {
      useStore.getState().setInputValue('')
      textareaRef.current?.blur()
      useStore.getState().setFileList([])
      useStore.getState().setShowUpload(false)
      // 重置状态
      setIsFromHistory(false)
      setIsFromSuggestion(false)
    }, 20)
  }

  useEffect(() => {
    console.log('home组件挂载')

    return () => {
      console.log('home组件卸载')
    }
  }, []) // 使用useEffect在组件加载时获取数据

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const RecentAnalysis = {
          page: 1,
          pageSize: 5,
          keyword: '',
        }

        const res = await getRecentAnalysis(getHttpHeader(), RecentAnalysis)
        if (!res.status) {
          console.log('获取最近分析数据失败:', res)
        }
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

      try {
        const res = await getHistory()
        console.log('获取历史搜搜数据成功:', res)
        if (res && Array.isArray(res)) {
          setSearchHistory(res)
        } else {
          console.log('获取数据失败，使用默认数据（没有）')
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
    setIsFromHistory(true)
    setIsFromSuggestion(false) // 确保只设置一个来源
    isSelectingRef.current = true
    useStore.getState().setInputValue(companyName)
    setHasSearchResults(false)

    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current)
    }

    setTimeout(() => {
      isSelectingRef.current = false
    }, 300)
  }

  // 返回初始状态
  const returnToInitialState = () => {
    useStore.getState().setInputValue('')
    setIsInputFocused(false)
    setHasSearchResults(false)
    setIsFromHistory(false)
    setIsFromSuggestion(false)
    console.log('返回初始状态', isFromHistory, isFromSuggestion)

    // 动画：隐藏搜索历史，显示欢迎区域和最近分析，搜索栏回到原位置
    setShowSearchHistory(false)
    setIsSearchBarMoved(false)
    setTimeout(() => {
      setShowWelcome(true)
      setShowRecentAnalysis(true)
    }, 150)
  }

  // 处理输入框焦点变化
  const handleInputFocus = () => {
    console.log('输入框获得焦点')
    setIsInputFocused(true)
    setIsFromHistory(false)
    setIsFromSuggestion(false)

    // 清除之前的 blur timeout
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current)
    }

    // 动画：隐藏欢迎区域和最近分析，搜索栏向上移动，显示搜索历史
    setShowWelcome(false)
    setShowRecentAnalysis(false)
    setIsSearchBarMoved(true)
    setTimeout(() => {
      setShowSearchHistory(true)
    }, 150)
  }

  const handleInputBlur = () => {
    console.log('输入框失去焦点, isSelecting:', isSelectingRef.current)

    // 清除之前的 timeout
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current)
    }

    // 延迟执行，给点击操作留出时间
    blurTimeoutRef.current = setTimeout(() => {
      if (isSelectingRef.current) {
        console.log('正在选择，不返回初始状态')
        return
      }

      if (!hasSearchResults) {
        console.log('没有搜索结果，返回初始状态')
        returnToInitialState()
      }
    }, 150)
  }

  // 处理清空搜索
  const handleClearSearch = () => {
    console.log('处理清空搜索')
    isSelectingRef.current = true
    setIsFromHistory(false)
    setIsFromSuggestion(false)

    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current)
    }

    setTimeout(() => {
      isSelectingRef.current = false
      console.log('清空搜索选择状态重置')
    }, 300)
  }

  // 处理模糊搜索结果显示
  const handleSearchResultsShow = (hasResults: boolean) => {
    if (!isFromHistory) {
      setHasSearchResults(hasResults)
    }
  }

  // 处理选择供应商
  const handleSelectSupplier = (supplier: any) => {
    console.log('选择供应商:', supplier)
    isSelectingRef.current = true
    setIsFromSuggestion(true)
    setIsFromHistory(false)
    setHasSearchResults(false)

    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current)
    }

    setTimeout(() => {
      isSelectingRef.current = false
    }, 500)
  }

  // 清理 timeout
  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current)
      }
    }
  }, [])

  const home = (
    <div className="home-container">
      {/* 顶部导航 */}
      {/* <div className="top-navigation">
        <div className="navigation-content">
          <div className="navigation-title">采购智能风控智能体</div>
        </div>
      </div> */}

      {/* 右上方背景图片 */}
      <div className="top-right-background"></div>

      {/* 主内容区 */}
      <div className="main-content">
        {/* 欢迎语区域 - 带渐入渐出动画 */}
        <div className={`welcome-section ${showWelcome ? 'fade-in' : 'fade-out'}`}>
          <div className="greeting-primary">Hi,</div>
          <div className="greeting-secondary">用户名</div>
          {/* <div className="greeting-description">敏捷赋能采购问题从洞见到解决</div> */}
        </div>
        {/* 搜索区域 - 带移动动画 */}
        <div className={`search-container-area ${isSearchBarMoved ? 'search-bar-moved' : ''}`}>
          <SearchInputWithDropdown
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onSelectSupplier={handleSelectSupplier}
            onClear={handleClearSearch}
            onSearch={(query) => {
              console.log('搜索关键词:', query)
              setIsFromHistory(false)
              setIsFromSuggestion(false)
            }}
            onSearchResultsShow={handleSearchResultsShow}
            isInputFocused={isInputFocused}
            setIsInputFocused={setIsInputFocused}
            isFromHistory={isFromHistory}
            isFromSuggestion={isFromSuggestion}
            setIsFromHistory={setIsFromHistory}
            setIsFromSuggestion={setIsFromSuggestion}
          />
        </div>
        {/* 开始分析按钮 */}
        {/* 此代码用于控制“开始分析”按钮的显示逻辑。 
        当没有搜索结果，或者输入数据是从历史搜索中点击获取时，显示“开始分析”按钮。 */}

        <button
          onClick={() => onSend()}
          className={`analysis-button ${!canAnalyze ? 'analysis-button-disabled' : ''}`}
          // disabled={!canAnalyze}
        >
          <img src={AnalysisLogo} alt="分析图标" className="button-icon" />
          <div className="button-text">开始分析</div>
        </button>

        {/* 历史搜索 - 带渐入渐出动画 */}
        <div className={`search-history-section ${showSearchHistory ? 'fade-in' : 'fade-out'}`}>
          <div className="history-title">历史搜索</div>
          <div className="history-tags">
            {searchHistory.map((history, index) => (
              <div
                key={index}
                className="history-tag"
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleHistoryClick(history)
                }}
              >
                {history}
              </div>
            ))}
          </div>
        </div>
        {/* 最近分析 - 带渐入渐出动画 */}
        <div className={`recent-analysis ${showRecentAnalysis ? 'fade-in' : 'fade-out'}`}>
          <div className="section-header">
            <div className="section-title">最近分析</div>
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
