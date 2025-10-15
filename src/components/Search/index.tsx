import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '@/store'
import './index.less'
import { getSuppliers } from '@/services'

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
}) => {
  const inputValue = useStore((s) => s.inputValue)
  const setInputValue = (value: string) => useStore.getState().setInputValue(value)
  const [suggestions, setSuggestions] = useState<Supplier[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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

  // 搜索逻辑
  useEffect(() => {
    if (isFromHistory) {
      setSuggestions([])
      setShowDropdown(false)
      onSearchResultsShow?.(false)
      return
    }

    if (isSelectingRef.current) {
      isSelectingRef.current = false
      return
    }

    const searchSuppliers = async () => {
      if (!inputValue.trim()) {
        setSuggestions([])
        setShowDropdown(false)
        onSearchResultsShow?.(false)
        return
      }

      setIsLoading(true)

      try {
        const filteredSuppliers = await getSuppliers(inputValue)

        setSuggestions(filteredSuppliers)
        const hasResults = filteredSuppliers.length > 0
        setShowDropdown(hasResults)
        onSearchResultsShow?.(hasResults)

        onSearch?.(inputValue)
      } catch (error) {
        console.error('搜索失败:', error)
        setSuggestions([])
        setShowDropdown(false)
        onSearchResultsShow?.(false)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchSuppliers, 300)
    return () => clearTimeout(debounceTimer)
  }, [inputValue, onSearch, onSearchResultsShow, isFromHistory])

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
        onSearchResultsShow?.(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onSearchResultsShow])

  // 选择供应商 - 修复焦点问题
  const handleSelectSupplier = (supplier: Supplier) => {
    console.log('选择供应商:', supplier.companyName)
    isSelectingRef.current = true

    // 先设置输入值
    setInputValue(supplier.companyName)
    setShowDropdown(false)
    setSuggestions([])
    onSearchResultsShow?.(false)

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
    onSearchResultsShow?.(false)

    // 保持输入框焦点
    setTimeout(() => {
      inputRef.current?.focus()
    }, 10)
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
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="请输入供应商名称/企业信用代码"
          className="search-input"
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
      {showDropdown && shouldShowFocusedStyle && !isFromHistory && (
        <div className="suggestions-container">
          <div className="suggestions-list">
            {suggestions.map((supplier) => (
              <div
                key={supplier.id}
                className="suggestion-item"
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleSelectSupplier(supplier)
                }}
              >
                <div className="supplier-info">
                  <div className="company-name">{highlightText(supplier.companyName, inputValue)}</div>
                  <div className="credit-code">{highlightText(supplier.creditCode, inputValue)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchInputWithDropdown
