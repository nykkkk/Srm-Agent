import ColorTool from './colorTool'

export function addStyleNode(styleStr: string, id: string) {
  const existNode = document.querySelector(`#${id}`)
  const styleNode = existNode || document.createElement('style')
  styleNode.innerHTML = styleStr
  if (!existNode) {
    styleNode.id = id
    document.getElementsByTagName('head')[0].appendChild(styleNode)
  }
}

export default function changeTheme({ color, buttonRadius }: any) {
  const colorTool = new ColorTool(color)
  const colors = colorTool.getColorPalettes()
  const color10 = colorTool.getExtendedColor(10)
  const color11 = colorTool.getExtendedColor(11)

  const cssVars = [
    `--kdm-g-color-theme-1: ${colors[0]}`,
    `--kdm-g-color-theme-2: ${colors[1]}`,
    `--kdm-g-color-theme-3: ${colors[2]}`,
    `--kdm-g-color-theme-4: ${colors[3]}`,
    `--kdm-g-color-theme-5: ${colors[4]}`,
    `--kdm-g-color-theme-6: ${colors[5]}`,
    `--kdm-g-color-theme-7: ${colors[6]}`,
    `--kdm-g-color-theme-8: ${colors[7]}`,
    `--kdm-g-color-theme-9: ${colors[8]}`,
    `--kdm-g-color-theme-10: ${color10}`,
    `--kdm-g-color-theme-11: ${color11}`,
  ]

  const styleStr = `
      :root {
        --kdm-custom-button-radio: ${buttonRadius || 4}px;
        --kd-g-color-theme: ${color};
        --kd-g-color-theme-6: ${color};
        --kdm-g-color-theme: ${color};
        ${cssVars.map((cssVar) => `${cssVar};`).join('\n        ')}
      }
    `
  addStyleNode(styleStr, '__kdm-theme-css-variable')
}
