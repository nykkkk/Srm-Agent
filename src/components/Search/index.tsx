import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useStore } from '@/store'
import './index.less'
import { getSuppliers } from '@/services'
import { getHttpHeader } from '@/utils'
export interface Supplier {
  id: string
  companyName: string
  creditCode: string
}

interface SearchInputWithDropdownProps {
  onSelectSupplier?: (supplier: Supplier) => void
  onSearch?: (query: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onClear?: () => void
  onSearchResultsShow?: (hasResults: boolean) => void
  isInputFocused?: boolean
  setIsInputFocused?: (focused: boolean) => void
  isFromHistory?: boolean
  isFromSuggestion?: boolean
  setIsFromHistory?: (fromHistory: boolean) => void
  setIsFromSuggestion?: (fromSuggestion: boolean) => void
}

const SearchInputWithDropdown: React.FC<SearchInputWithDropdownProps> = ({
  onSelectSupplier,
  onSearch,
  onFocus,
  onBlur,
  onClear,
  onSearchResultsShow,
  isInputFocused,
  setIsInputFocused,
  isFromHistory,
  isFromSuggestion,
  setIsFromHistory,
  setIsFromSuggestion,
}) => {
  const inputValue = useStore((s) => s.inputValue)
  const setInputValue = (value: string) => useStore.getState().setInputValue(value)
  const [suggestions, setSuggestions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasNoResults, setHasNoResults] = useState(false)
  const isSelectingRef = useRef(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 内部焦点状态管理
  const [internalIsFocused, setInternalIsFocused] = useState(false)

  // 同步外部焦点状态
  useEffect(() => {
    if (isInputFocused !== undefined) {
      setInternalIsFocused(isInputFocused)
    }
  }, [isInputFocused])

  // 监听输入值变化，当用户手动输入时重置来源状态
  useEffect(() => {
    // 如果输入值变化且不是来自选择操作，则重置来源状态
    if (inputValue && !isSelectingRef.current) {
      setIsFromHistory?.(false)
      setIsFromSuggestion?.(false)
    }
  }, [inputValue, setIsFromHistory, setIsFromSuggestion])

  useEffect(() => {
    console.log('suggestions 状态已更新:', suggestions)
  }, [suggestions])

  // 修复重复搜索问题 - 简化版本
  useEffect(() => {
    console.log(
      '搜索逻辑触发 - inputValue:',
      inputValue,
      'isFromHistory:',
      isFromHistory,
      'isSelectingRef:',
      isSelectingRef.current,
    )

    // 如果来自历史记录，不进行搜索
    if (isFromHistory) {
      console.log('来自历史记录，跳过搜索')
      setSuggestions([])
      setShowDropdown(false)
      setHasNoResults(false)
      onSearchResultsShow?.(false)
      return
    }

    // 如果是选择操作，不进行搜索
    if (isSelectingRef.current) {
      console.log('选择操作中，跳过搜索')
      return
    }

    const searchSuppliers = async () => {
      console.log('开始搜索:', inputValue)

      if (!inputValue.trim()) {
        console.log('输入为空，清空下拉框')
        setSuggestions([])
        setShowDropdown(false)
        setHasNoResults(false)
        onSearchResultsShow?.(false)
        return
      }

      setIsLoading(true)
      setHasNoResults(false)
      // 关键：在搜索开始时就显示下拉框
      setShowDropdown(true)

      try {
        const filteredSuppliers = await getSuppliers(getHttpHeader(), {
          keyword: inputValue,
        })

        console.log('搜索成功，结果数量:', filteredSuppliers.data.length)

        // 确保当前输入值没有变化且不是选择操作
        if (inputValue.trim() && !isSelectingRef.current) {
          setSuggestions(filteredSuppliers.data)
          const hasResults = filteredSuppliers.data.length > 0
          setHasNoResults(!hasResults)
          onSearchResultsShow?.(hasResults)

          // 只在真正需要搜索时调用 onSearch
          if (!isSelectingRef.current) {
            onSearch?.(inputValue)
          }
        }
      } catch (error) {
        console.error('搜索失败:', error)
        // 即使出错也要显示下拉框，显示错误状态
        setSuggestions([])
        setHasNoResults(true)
        setShowDropdown(true)
        onSearchResultsShow?.(false)
      } finally {
        setIsLoading(false)
      }
    }

    // 使用防抖
    const debounceTimer = setTimeout(searchSuppliers, 300)
    return () => {
      console.log('清理上一次搜索')
      clearTimeout(debounceTimer)
    }
  }, [inputValue, isFromHistory]) // 只保留必要的依赖项

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
        setHasNoResults(false)
        onSearchResultsShow?.(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onSearchResultsShow])

  // 选择供应商
  const handleSelectSupplier = (supplier) => {
    console.log('选择供应商:', supplier)
    isSelectingRef.current = true

    // 先设置输入值
    setInputValue(supplier)
    setShowDropdown(false)
    setSuggestions([])
    setHasNoResults(false)
    onSearchResultsShow?.(false)

    // 设置来源状态
    setIsFromSuggestion?.(true)
    setIsFromHistory?.(false)

    // 立即设置焦点状态，确保样式正确
    setInternalIsFocused(true)
    setIsInputFocused?.(true)

    // 通知父组件
    onSelectSupplier?.(supplier)

    // 重新聚焦输入框
    setTimeout(() => {
      inputRef.current?.focus()
      console.log('重新聚焦输入框，保持聚焦样式')
      // 再次确认焦点状态
      setInternalIsFocused(true)
      setIsInputFocused?.(true)
    }, 10)

    // 延迟重置选择状态
    setTimeout(() => {
      isSelectingRef.current = false
    }, 300)
  }

  // 高亮匹配文本
  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text

    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} className="highlight-text">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </>
    )
  }

  // 清空搜索 - 只清除文本，保持焦点
  const handleClear = () => {
    console.log('清空输入文本')
    setInputValue('')
    setSuggestions([])
    setShowDropdown(false)
    setHasNoResults(false)
    onSearchResultsShow?.(false)
    setIsFromHistory?.(false)
    setIsFromSuggestion?.(false)

    // 保持输入框焦点
    setTimeout(() => {
      inputRef.current?.focus()
    }, 10)
  }

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // 如果用户手动输入（删除或添加字符），重置来源状态
    if (!isSelectingRef.current) {
      setIsFromHistory?.(false)
      setIsFromSuggestion?.(false)
    }
  }

  // 处理输入框焦点
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('输入框获得焦点')
    setInternalIsFocused(true)
    setIsInputFocused?.(true)

    if (inputValue.trim() && suggestions.length > 0 && !isFromHistory) {
      setShowDropdown(true)
      onSearchResultsShow?.(true)
    }
    onFocus?.()
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('输入框失去焦点')

    // 延迟处理失焦，给点击操作留出时间
    setTimeout(() => {
      if (!isSelectingRef.current) {
        setInternalIsFocused(false)
        setIsInputFocused?.(false)
        console.log('执行失焦逻辑')
      } else {
        console.log('正在选择操作，跳过失焦')
      }
    }, 200)
    onBlur?.()
  }

  // 取消按钮处理函数 - 模拟真实 blur 事件
  const handleCancel = () => {
    console.log('点击取消，模拟 blur 事件')

    // 标记为非选择操作
    isSelectingRef.current = false

    // 创建并分发 blur 事件
    if (inputRef.current) {
      const blurEvent = new FocusEvent('blur', {
        bubbles: true,
        cancelable: true,
      })
      inputRef.current.dispatchEvent(blurEvent)
    }

    // 确保失去焦点
    inputRef.current?.blur()
  }

  // 使用内部焦点状态或外部焦点状态
  const shouldShowFocusedStyle = internalIsFocused

  return (
    <div className="search-wrapper" ref={dropdownRef}>
      <div className={`search-container ${shouldShowFocusedStyle ? 'search-focused' : ''}`}>
        {shouldShowFocusedStyle && (
          <div className="search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                stroke="#1890ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="请输入供应商名称/企业信用代码"
          className={`search-input ${shouldShowFocusedStyle ? 'with-search-icon' : ''}`}
        />

        {/* 清空按钮 - 只在有输入值时显示，不区分焦点状态 */}
        {inputValue && (
          <button
            className="clear-button"
            onClick={handleClear}
            onMouseDown={(e) => {
              e.preventDefault()
            }}
          >
            ×
          </button>
        )}

        {/* 取消按钮 - 只在聚焦状态显示 */}
        {shouldShowFocusedStyle && (
          <button
            className="cancel-button"
            onClick={handleCancel}
            onMouseDown={(e) => {
              e.preventDefault()
            }}
            type="button"
          >
            取消
          </button>
        )}

        {/* 加载指示器 */}
        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
          </div>
        )}
      </div>

      {/* 下拉建议框 */}
      {showDropdown && shouldShowFocusedStyle && (
        <div className="suggestions-container">
          <div className="suggestions-list">
            {isLoading ? (
              // 加载中状态
              <div className="suggestion-empty">
                <div className="loading-text">搜索中...</div>
              </div>
            ) : hasNoResults ? (
              // 无结果状态
              <div className="suggestion-empty">
                <div className="empty-text">暂未搜索到供应商</div>
              </div>
            ) : (
              // 有结果状态
              suggestions.map((supplier) => (
                <div
                  key={supplier}
                  className="suggestion-item"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleSelectSupplier(supplier)
                  }}
                >
                  <div className="supplier-info">
                    <div className="company-name">{highlightText(supplier, inputValue)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchInputWithDropdown