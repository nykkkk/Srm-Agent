import React, { useEffect, useRef, useState } from 'react'

export const AutoHeightIframe: React.FC<{ html: string }> = ({ html }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState('400px')

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document
        if (iframeDocument && iframeDocument.body) {
          // 获取内容高度
          const contentHeight = Math.max(iframeDocument.body.scrollHeight, iframeDocument.documentElement.scrollHeight)
          setHeight(`${contentHeight}px`)
        }
      } catch (error) {
        console.warn('无法访问 iframe 内容:', error)
      }
    }

    iframe.addEventListener('load', handleLoad)

    // 初始设置
    setTimeout(handleLoad, 100)

    return () => {
      iframe.removeEventListener('load', handleLoad)
    }
  }, [html])

  return (
    <iframe
      ref={iframeRef}
      srcDoc={html}
      width="100%"
      height={height}
      frameBorder="0"
      title="供应商风险详情"
      sandbox="allow-scripts allow-same-origin"
      style={{
        minHeight: '400px',
        border: 'none',
        borderRadius: '8px',
      }}
    />
  )
}
