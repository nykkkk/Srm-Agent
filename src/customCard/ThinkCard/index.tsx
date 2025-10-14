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
      <div className={classNames(`${prefix}-container`)}>
        <div className={classNames(`${prefix}-title`)} onClick={() => onClick()}>
          <div className={classNames(`${prefix}-title-logo`)}>
            {!isComplete && !isStop && <div className={classNames(`${prefix}-title-logo-loading`)} />}
            <div className={classNames(`${prefix}-title-logo-star`)} />
            {(isComplete || isStop) && <div className={classNames(`${prefix}-title-logo-done`)} />}
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
          <div className={classNames(`${prefix}-icon`)}>
            <Icon type="arrow-down" className={classNames(`arrow-icon`, { up: state.showMain })} />
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
    </div>
  )
}

export default ThinkCard
