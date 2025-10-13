import Color from 'color'

const tuple = <T extends readonly string[]>(...args: T): T => args
export const colorTypes = tuple('hsl', 'hex', 'rgb', 'hsv')
export type colorType = (typeof colorTypes)[number]

export interface ColorToolInterface {
  themeColor: string
  type: colorType
  getColorPalettes: () => Array<string>
  getColorPalette: (i: number) => string
}
export default class ColorTool implements ColorToolInterface {
  readonly themeColor: string

  readonly type: colorType

  constructor(themeColor = '#276ff5', type: colorType = 'hex') {
    this.themeColor = themeColor
    this.type = type
  }

  /**
   * 获取当前主题色下1-9个衍生色
   */
  getColorPalettes(): Array<string> {
    const colors: any[] = []
    for (let i = 1; i <= 9; i += 1) {
      const color: any = this.getColorPalette(i)
      colors.push(color)
    }
    return colors
  }

  /**
   * 计算第10和第11个扩展颜色
   * @param index 10 或 11
   * @returns 计算出的颜色值
   */
  getExtendedColor(index: number): string {
    if (index !== 10 && index !== 11) {
      throw new Error('Extended color index must be 10 or 11')
    }

    const hsvH = Color(this.themeColor).hsv().hue()
    const hsvS = Color(this.themeColor).hsv().saturationv()
    const hsvV = Color(this.themeColor).hsv().value()

    let hue: number
    let saturation: number
    let value: number

    if (index === 10) {
      // 目标: #ff8e24 - 精确匹配目标颜色的HSV值
      hue = hsvH + 4.1 // 色相调整 +4.1
      saturation = Math.max(hsvS - 14.1, 0) // 饱和度调整 -14.1
      value = hsvV // 亮度保持不变
    } else {
      // index === 11, 目标: #ff4800 - 精确匹配目标颜色的HSV值
      hue = hsvH - 8 // 色相调整 -8
      saturation = hsvS // 饱和度保持不变
      value = hsvV // 亮度保持不变
    }

    // 确保色相在有效范围内
    if (hue < 0) {
      hue += 360
    } else if (hue >= 360) {
      hue -= 360
    }
    hue = Math.round(hue * 10) / 10 // 保留一位小数精度

    let color: string
    switch (this.type) {
      case 'hsl':
        color = Color({ h: hue, s: saturation, v: value }).hsl().toString()
        break
      case 'hsv':
        color = Color({ h: hue, s: saturation, v: value }).hsv().toString()
        break
      case 'rgb':
        color = Color({ h: hue, s: saturation, v: value }).rgb().toString()
        break
      default:
        color = Color({ h: hue, s: saturation, v: value }).hex()
    }
    return color
  }

  /**
   * 获取扩展的颜色调色板（包含第10和第11个颜色）
   */
  getExtendedColorPalettes(): string[] {
    const palettes = this.getColorPalettes()
    palettes.push(this.getExtendedColor(10))
    palettes.push(this.getExtendedColor(11))
    return palettes
  }

  /**
   *
   * @param i 1-9个衍生色， 主题色为第六个
   */
  getColorPalette(i: number): string {
    const isLight = i <= 6
    const index = Math.abs(6 - i)
    const hsvH = Color(this.themeColor).hsv().hue()
    const hsvS = Color(this.themeColor).hsv().saturationv()
    const hsvV = Color(this.themeColor).hsv().value()
    let hue
    let saturation
    let value

    if (hsvH >= 60 && hsvH <= 240) {
      hue = isLight ? hsvH - 2 * index : hsvH + 2 * index
    } else {
      hue = isLight ? hsvH + 2 * index : hsvH - 2 * index
    }
    if (hue < 0) {
      hue += 360
    } else if (hue >= 360) {
      hue -= 360
    }
    hue = Math.round(hue)
    if (isLight) {
      saturation = Math.max(hsvS - 18 * index, 5)
    } else {
      saturation = Math.min(hsvS + 8 * index, 100)
    }
    saturation = Number(saturation)

    if (isLight) {
      value = Math.min(100, hsvV + 8 * index)
    } else {
      value = Math.max(5, hsvV - 16 * index)
    }
    value = Number(value)

    let color: string
    switch (this.type) {
      case 'hsl':
        color = Color({ h: hue, s: saturation, v: value }).hsl().toString()
        break
      case 'hsv':
        color = Color({ h: hue, s: saturation, v: value }).hsv().toString()
        break
      case 'rgb':
        color = Color({ h: hue, s: saturation, v: value }).rgb().toString()
        break
      default:
        color = Color({ h: hue, s: saturation, v: value }).hex()
    }
    return color
  }
}
