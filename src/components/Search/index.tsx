// components/SearchInputWithDropdown.tsx
import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '@/store'
import './index.less'
export interface Supplier {
  id: string
  companyName: string
  creditCode: string
}

interface SearchInputWithDropdownProps {
  onSelectSupplier?: (supplier: Supplier) => void
  onSearch?: (query: string) => void
}

const SearchInputWithDropdown: React.FC<SearchInputWithDropdownProps> = ({ onSelectSupplier, onSearch }) => {
  const inputValue = useStore((s) => s.inputValue)
  const setInputValue = (value: string) => useStore.getState().setInputValue(value)
  const [suggestions, setSuggestions] = useState<Supplier[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // 使用 useRef 来跟踪状态，避免重新渲染
  const isSelectingRef = useRef(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 搜索逻辑 - 使用 API
  useEffect(() => {
    // 如果正在选择中，不执行搜索
    if (isSelectingRef.current) {
      isSelectingRef.current = false // 重置选择状态
      return
    }
    const searchSuppliers = async () => {
      if (!inputValue.trim()) {
        setSuggestions([])
        setShowDropdown(false)
        return
      }

      setIsLoading(true)

      try {
        const response = await fetch(`/api/suppliers/search?q=${encodeURIComponent(inputValue)}`)
        const data = await response.json()
        setSuggestions(data)
        setShowDropdown(data.length > 0)

        // 调用搜索回调
        onSearch?.(inputValue)
      } catch (error) {
        console.error('搜索失败:', error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchSuppliers, 300)
    return () => clearTimeout(debounceTimer)
  }, [inputValue, onSearch])

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // 选择供应商
  const handleSelectSupplier = (supplier: Supplier) => {
    isSelectingRef.current = true // 标记正在选择
    setInputValue(supplier.companyName)
    setShowDropdown(false)
    setSuggestions([])
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
  }

  return (
    <div className="search-wrapper" ref={dropdownRef}>
      <div className="search-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => inputValue && setShowDropdown(suggestions.length > 0)}
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

      {/* 下拉建议框 */}
      {showDropdown && (
        <div className="dropdown-container">
          {suggestions.length > 0 ? (
            <div className="dropdown-list">
              {suggestions.map((supplier) => (
                <div key={supplier.id} className="dropdown-item" onClick={() => handleSelectSupplier(supplier)}>
                  <div className="supplier-info">
                    <div className="company-name">{highlightText(supplier.companyName, inputValue)}</div>
                    <div className="credit-code">{highlightText(supplier.creditCode, inputValue)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !isLoading && <div className="dropdown-empty">未找到匹配的供应商</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchInputWithDropdown
