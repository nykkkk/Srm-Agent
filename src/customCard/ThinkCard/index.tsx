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

  return (
    <div className={classNames(prefix)}>
      {/* {!isComplete && !isStop && (
        <div className={classNames(`${prefix}-preThink`)}>
          <img className={classNames(`${prefix}-preThink-svg`)} src={thinking} alt="" />
          <div className={classNames(`${prefix}-preThink-process`)}>
            正在生成 <img src={generatingDoc} alt="" />
          </div>
          <div className={classNames(`${prefix}-preThink-title`)}>深圳德胜电子科技有限公司供应商风险评估报告 </div>
          <div className={classNames(`${prefix}-preThink-finish`)}>
            好的，<span className={classNames(`${prefix}-preThink-finish-agent`)}>采购智能风控Agent</span>{' '}
            已接收到您的任务
          </div>
        </div>
      )} */}

      <div className={classNames(`${prefix}-preThink`)}>
        <img className={classNames(`${prefix}-preThink-svg`)} src={thinking} alt="" />
        <div className={classNames(`${prefix}-preThink-process`)}>
          正在生成 <img src={generatingDoc} alt="" />
        </div>
        <div className={classNames(`${prefix}-preThink-title`)}>深圳德胜电子科技有限公司供应商风险评估报告 </div>
        <div className={classNames(`${prefix}-preThink-finish`)}>
          好的，<span className={classNames(`${prefix}-preThink-finish-agent`)}>采购智能风控Agent</span>{' '}
          已接收到您的任务
        </div>
      </div>

      <div className={classNames(`${prefix}-container`, { show: state.showMain })}>
        <div className={classNames(`${prefix}-header-container`)}>
          {/* 思考过程标题 - 控制展开收起 */}
          <div className={classNames(`${prefix}-header`)} onClick={() => onClick()}>
            <img className={classNames(`${prefix}-header-svg`)} src={light} alt="" />
            <div className={classNames(`${prefix}-header-title`)}>思考过程</div>
            <div className={classNames(`${prefix}-header-icon`)}>
              <Icon type="arrow-right" className={classNames(`arrow-icon`, { down: state.showMain })} />
            </div>
          </div>
          <div className={classNames(`${prefix}-header-container-content`, { show: state.showMain })}>
            系统检测出您的企业是电子科技，并采用ETO的生产制造模式。ETO模式的特点是个性化强、项目制，所以呆滞风险主要来自设计变更，您的深层需求可能不只是简单的分析报告，而是希望找到呆滞的根本原因，并减少呆滞库存，降低库存呆滞金额；需要强调归因到具体项目和客户，因此分析报告中会体现项目、ECN变更以及客户等维度的分析，同时给出相应的呆滞处理建议。
          </div>
        </div>

        <div className={classNames(`${main}`, { show: state.showMain })}>
          <>
            {state?.center && (
              <div className={classNames(`${main}-center`)}>
                <div className={classNames(`${main}-center-title`)} onClick={() => onClick('center')}>
                  <div>{state.center.title}</div>
                  <Icon type="arrow-down" className={classNames(`arrow-icon`, { up: state.center.show })} />
                </div>
                <div className={classNames(`${main}-center-content`, { show: state.center.show })}>
                  {state.center.list.map((item: any, index: number) => {
                    const { title, subtitle, process } = item
                    const img = process === 100 ? (index === 0 ? oImg : tImg) : null
                    return (
                      <div className={classNames(`${main}-center-content-item`)} key={title}>
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
                          {subtitle && (
                            <div className="center-subtitle" dangerouslySetInnerHTML={{ __html: subtitle }} />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>

          <>
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
          </>
        </div>
      </div>

      {/* 固定底部的标题部分 - 不控制展开收起 */}
      <div className={classNames(`${prefix}-footer`)}>
        <div className={classNames(`${prefix}-title`)}>
          <div className={classNames(`${prefix}-title-logo`)}>
            <div className={classNames(`${prefix}-title-logo-write`)}>
              <img src={write} alt="" />
            </div>
            {/* {!isComplete && !isStop && <div className={classNames(`${prefix}-title-logo-loading`)} />} */}
            {/* <div className={classNames(`${prefix}-title-logo-star`)} /> */}
            {/* {(isComplete || isStop) && <div className={classNames(`${prefix}-title-logo-done`)} />} */}
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
          <div className={classNames(`${prefix}-icon`)}>{/* 底部标题部分没有交互功能 */}</div>
        </div>
      </div>
    </div>
  )
}

export default ThinkCard
