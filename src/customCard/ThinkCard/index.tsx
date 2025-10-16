import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { useImmer as useState } from 'use-immer'
import { Icon } from 'kdesign-mobile'
import { useChatPro } from '@kdcloudjs/kdesign-chatui'
import { produce } from 'immer'

import dImg from './img/done.svg'
import alImg from './img/agentLoading.svg'
import awImg from './img/agentWait.svg'
import oImg from './img/1.svg'
import tImg from './img/2.svg'
import think from './img/think.svg'
import thinking from './img/Thinking.svg'
import light from './img/Light.svg'
import write from './img/write.svg'
import generatingDoc from './img/GeneratingDoc.svg'
import './index.less'

import { C_THINK } from '@/constant'

export type ThinkCardData = {
  id: string
  title?: string
  agentNumber: number[]
  process: number
  showMain: boolean
  stop?: boolean
  pre?: string
  main: {
    id: string
    title: string
    subtitle: string
    content: string
    show: boolean
    process: number
  }[]
  center: {
    title: string
    show: boolean
    list: {
      level: any
      content: any
      id: string
      title: string
      subtitle: string
      process: number
    }[]
  }
}

export type ThinkMessage = {
  type: 'bottom' | 'top' | 'center' | 'stop'
  status?: 'create' | 'edit' | 'append'
  title?: string
  id?: string
  subtitle?: string
  content?: string
  parentId?: string
  process?: number
  agentNumber?: number[]
}

export type ThinkProps = {
  content?: ThinkCardData
}

const prefix = 'custom-card-think-card'
const main = `${prefix}-main`

const ThinkCard = (props: ThinkProps) => {
  const state: any = props?.content && props.content?.title ? props.content : null

  const chatProRef = useChatPro()

  // 添加动画状态管理
  const [animationState, setAnimationState] = useState({
    showPreThink: false,
    showProcess: false,
    showTitle: false,
    showFinish: false,
    showThinkingContent: false, // 控制思考内容的显示
    hidePreThink: false, // 新增：控制 preThink 部分的隐藏
  })

  // 使用 ref 来跟踪动画是否已经开始
  const animationStartedRef = useRef(false)

  useEffect(() => {
    // 确保只在组件首次渲染时开始动画，并且有状态数据
    if (state && !animationStartedRef.current) {
      animationStartedRef.current = true

      // 延迟开始动画，让组件先渲染
      setTimeout(() => {
        setAnimationState((draft) => {
          draft.showPreThink = true
        })

        // 依次显示各个元素
        setTimeout(() => {
          setAnimationState((draft) => {
            draft.showProcess = true
          })
        }, 300)

        setTimeout(() => {
          setAnimationState((draft) => {
            draft.showTitle = true
          })
        }, 600)

        setTimeout(() => {
          setAnimationState((draft) => {
            draft.showFinish = true
          })

          // 当最后一个元素动画完成后，显示思考内容
          setTimeout(() => {
            setAnimationState((draft) => {
              draft.showThinkingContent = true
            })
          }, 500)
        }, 900)
      }, 100)
    }
  }, [state])

  const onClick = (type: string | undefined = undefined, id?: string) => {
    chatProRef.setChatMessage(state?.id, (msg: any) => {
      return produce(msg, (draftState: any) => {
        const target = draftState.find((d: any) => d.type === C_THINK)
        if (!target) return

        if (type === 'center') {
          target.content.center.show = !target.content.center.show
        } else if (type === 'bottom') {
          const item = target.content.main.find((d: any) => d.id === id)
          if (!item) return
          item.show = !item.show
        } else {
          // 控制思考卡片的展开与收起
          target.content.showMain = !target.content.showMain
        }
      })
    })
  }

  const stopThink = () => {}

  if (!state) return null

  const isStop = !!state?.stop
  const isComplete = state?.process === 100

  if (isComplete || isStop) {
    stopThink()
  }
  // 监听思考完成状态，隐藏 preThink 部分
  useEffect(() => {
    if ((isComplete || isStop) && !animationState.hidePreThink) {
      // 添加延迟，让用户能看到预思考部分的完成状态
      const timer = setTimeout(() => {
        setAnimationState((draft) => {
          draft.hidePreThink = true
        })
      }, 1000) // 延迟 1 秒后隐藏

      return () => clearTimeout(timer)
    }
  }, [isComplete, isStop, animationState.hidePreThink])
  return (
    <div className={classNames(prefix)}>
      {/* preThink 部分 - 思考完成后隐藏 */}
      <div
        className={classNames(`${prefix}-preThink`, {
          'animate-in': animationState.showPreThink,
          'animate-out': (isComplete || isStop) && animationState.hidePreThink, // 添加淡出动画
        })}
      >
        <img
          className={classNames(`${prefix}-preThink-svg`, { 'animate-in': animationState.showPreThink })}
          src={thinking}
          alt=""
        />
        <div className={classNames(`${prefix}-preThink-process`, { 'animate-in': animationState.showProcess })}>
          正在生成 <img src={generatingDoc} alt="" />
        </div>
        <div className={classNames(`${prefix}-preThink-title`, { 'animate-in': animationState.showTitle })}>
          深圳德胜电子科技有限公司供应商风险评估报告
        </div>
        <div className={classNames(`${prefix}-preThink-finish`, { 'animate-in': animationState.showFinish })}>
          好的，<span className={classNames(`${prefix}-preThink-finish-agent`)}>采购智能风控Agent</span>{' '}
          已接收到您的任务
        </div>
      </div>

      {/* 思考内容部分 */}
      <div
        className={classNames(`${prefix}-container`, {
          show: state.showMain,
          'thinking-animate-in': animationState.showThinkingContent,
        })}
      >
        <div className={classNames(`${prefix}-header-container`)}>
          <div className={classNames(`${prefix}-header`)} onClick={() => onClick()}>
            <img className={classNames(`${prefix}-header-svg`)} src={light} alt="" />
            <div className={classNames(`${prefix}-header-title`)}>
              {!isComplete && !isStop ? '思考过程' : '思考完成'}
            </div>
            <div className={classNames(`${prefix}-header-icon`)}>
              <Icon type="arrow-right" className={classNames(`arrow-icon`, { down: state.showMain })} />
            </div>
          </div>
          <div className={classNames(`${prefix}-header-container-content`, { show: state.showMain })}>{state?.pre}</div>
        </div>

        <div className={classNames(`${main}`, { show: state.showMain })}>
          {state?.center && (
            <div className={classNames(`${main}-center`)}>
              <div className={classNames(`${main}-center-title`)} onClick={() => onClick('center')}>
                <div>{state.center.title}</div>
                <Icon type="arrow-down" className={classNames(`arrow-icon`, { up: state.center.show })} />
              </div>
              <div className={classNames(`${main}-center-content`, { show: state.center.show })}>
                {state.center.list.map((item: any, index: number) => {
                  const { title, subtitle, process, id } = item
                  const img = process === 100 ? (index === 0 ? oImg : tImg) : null
                  return (
                    <div className={classNames(`${main}-center-content-item`)} key={id || `center-${index}`}>
                      <div className="center-logo">
                        {img ? (
                          <img src={img} alt="" />
                        ) : (
                          <div>
                            <Icon type={isStop ? 'forbid' : 'loadding-circle'} spin={!isStop} />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="center-title">{title}</div>
                        {subtitle && <div className="center-subtitle" dangerouslySetInnerHTML={{ __html: subtitle }} />}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {Array.isArray(state?.main) && state?.main.length > 0 && (
            <div className={classNames(`${main}-bottom`)}>
              {state?.main.map((item: any) => {
                const { title, subtitle, process, content, show, id } = item
                const icon = process === 100 ? dImg : isStop ? awImg : alImg
                return (
                  <div className={classNames(`${main}-bottom-item`, { show })} key={id}>
                    <div
                      className={classNames(`${main}-bottom-item-title`, { show })}
                      onClick={() => onClick('bottom', id)}
                    >
                      <div className="bottom-title">
                        <img className={classNames({ loading: process !== 100 })} src={icon} alt="" />
                        <div>{title}</div>
                      </div>
                      <Icon type="arrow-down" className={classNames(`arrow-icon`, { up: show })} />
                    </div>
                    <div className={classNames(`${main}-bottom-item-content`, { show })}>
                      <div className="bottom-img">
                        <img src={think} alt="" />
                      </div>
                      <div>
                        <div className="bottom-subtitle">{subtitle}</div>
                        {content && <div className="bottom-content" dangerouslySetInnerHTML={{ __html: content }} />}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* 固定底部的标题部分 */}
      <div
        className={classNames(`${prefix}-footer`, {
          'thinking-animate-in': animationState.showThinkingContent,
        })}
      >
        <div className={classNames(`${prefix}-title`)}>
          <div className={classNames(`${prefix}-title-logo`)}>
            <div
              className={classNames(`${prefix}-title-logo-write`, {
                completed: isComplete || isStop,
              })}
            >
              <img src={write} alt="" />
            </div>
          </div>
          <div className={classNames(`${prefix}-title-main`)}>
            <div>{state?.title}</div>
            {!isComplete && !isStop && (
              <div>
                <span>（{state.agentNumber?.[0] || 0}</span>
                <span>/{state.agentNumber?.[1] || 0}）</span>
              </div>
            )}
          </div>
          <div className={classNames(`${prefix}-icon`)}></div>
        </div>
      </div>
    </div>
  )
}

export default ThinkCard
