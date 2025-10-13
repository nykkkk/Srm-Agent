import { Spin } from 'kdesign-mobile'

type TType = 'page' | 'container' | 'component' | undefined

interface IProps {
  type?: TType
  style?: React.CSSProperties
}

const Loading = ({ type = 'page', style = {} }: IProps) => {
  return (
    <div
      style={{
        flex: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: type === 'page' ? 'fixed' : 'absolute',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(255, 255, 255, 1)',
        ...style,
      }}
    >
      <Spin />
    </div>
  )
}

export default Loading
