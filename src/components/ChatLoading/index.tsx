import { Spin } from 'kdesign-mobile'
import { useMemo } from 'react'
import classNames from 'classnames'
import { Player } from '@lottiefiles/react-lottie-player'
import Color from 'color'

import LoadingData from './data.json'

const ChatLoading = ({ style, className }: any) => {
  // 获取当前主题色
  const getThemeColor = () => {
    const rootStyles = getComputedStyle(document.documentElement)
    const themeColor = rootStyles.getPropertyValue('--kdm-g-color-theme').trim()
    return themeColor || '#276ff5' // 默认颜色
  }

  // 动态修改Lottie数据中的颜色
  const modifiedLoadingData = useMemo(() => {
    const themeColor = getThemeColor()
    const colorObj = Color(themeColor)
    const rgbArray = [colorObj.red() / 255, colorObj.green() / 255, colorObj.blue() / 255, 1]

    // 深拷贝原始数据
    const data = JSON.parse(JSON.stringify(LoadingData))

    // 递归查找并替换颜色值
    const replaceColors = (obj: any) => {
      if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
          obj.forEach(replaceColors)
        } else {
          // 查找填充颜色属性
          if (obj.ty === 'fl' && obj.c && obj.c.k && Array.isArray(obj.c.k)) {
            // 检查是否是我们要替换的颜色（原始蓝色）
            const currentColor = obj.c.k
            if (
              currentColor.length >= 3 &&
              Math.abs(currentColor[0] - 0.152941176471) < 0.001 &&
              Math.abs(currentColor[1] - 0.435294117647) < 0.001 &&
              Math.abs(currentColor[2] - 0.960784313725) < 0.001
            ) {
              obj.c.k = rgbArray
            }
          }

          // 递归处理对象的所有属性
          Object.values(obj).forEach(replaceColors)
        }
      }
    }

    replaceColors(data)
    return data
  }, [])

  return (
    <div className={classNames('app-loading', className)} style={{ paddingTop: 3, ...(style || {}) }}>
      <Player
        autoplay
        loop
        src={modifiedLoadingData}
        style={{ width: '100%', height: '100%' }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
        }}
      />
    </div>
  )
}

export default ChatLoading
