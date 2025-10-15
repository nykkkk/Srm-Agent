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
  onSearchResultsShow?: (hasResults: boolean) => void
  isInputFocused?: boolean
  isFromHistory?: boolean // 新增属性：是否来自历史搜索
}

const SearchInputWithDropdown: React.FC<SearchInputWithDropdownProps> = ({
  onSelectSupplier,
  onSearch,
  onFocus,
  onBlur,
  onSearchResultsShow,
  isInputFocused,
  isFromHistory, // 接收是否来自历史搜索的标记
}) => {
  const inputValue = useStore((s) => s.inputValue)
  const setInputValue = (value: string) => useStore.getState().setInputValue(value)
  const [suggestions, setSuggestions] = useState<Supplier[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const isSelectingRef = useRef(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 搜索逻辑 - 使用 Mock 数据
  useEffect(() => {
    // 如果来自历史搜索，不执行搜索
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
        // 使用 Mock 数据进行模糊搜索
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
  }, [inputValue, onSearch, onSearchResultsShow, isFromHistory]) // 添加 isFromHistory 依赖

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

  // 选择供应商
  const handleSelectSupplier = (supplier: Supplier) => {
    isSelectingRef.current = true
    setInputValue(supplier.companyName)
    setShowDropdown(false)
    setSuggestions([])
    onSearchResultsShow?.(false)
    onSelectSupplier?.(supplier)
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

  // 清空搜索
  const handleClear = () => {
    setInputValue('')
    setSuggestions([])
    setShowDropdown(false)
    onSearchResultsShow?.(false)
  }

  // 处理输入框焦点
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputValue.trim() && suggestions.length > 0 && !isFromHistory) {
      setShowDropdown(true)
      onSearchResultsShow?.(true)
    }
    onFocus?.()
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.()
  }

  return (
    <div className="search-wrapper" ref={dropdownRef}>
      <div className="search-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="请输入供应商名称/企业信用代码"
          className="search-input"
        />

        {/* 清空按钮 */}
        {inputValue && (
          <button className="clear-button" onClick={handleClear}>
            ×
          </button>
        )}

        {/* 加载指示器 */}
        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
          </div>
        )}
      </div>

      {/* 白色背景的下拉建议框 - 直接从输入框下方弹出 */}
      {showDropdown && isInputFocused && !isFromHistory && (
        <div className="suggestions-container">
          <div className="suggestions-list">
            {suggestions.map((supplier) => (
              <div key={supplier.id} className="suggestion-item" onClick={() => handleSelectSupplier(supplier)}>
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
