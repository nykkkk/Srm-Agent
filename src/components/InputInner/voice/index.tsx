import React, { useEffect, useRef, useState } from 'react'
import { useChatPro } from '@kdcloudjs/kdesign-chatui'
import { Player } from '@lottiefiles/react-lottie-player'
import classNames from 'classnames'

import { sdkStartRecord, sdkStopRecord } from '@/services/sdk'
import { useStore } from '@/store'
import { debounce } from '@/utils/debounce'

import VoiceStaticLottie from './voice-static.json'
import VoiceLottie from './voice.json'
import './index.less'

const CANCEL_THRESHOLD = 20

const Voice = (props: any) => {
  const { loading, showVoice, getSuffixIcon, prefix, onSend } = props
  const chatProRef = useChatPro()

  const locale = useStore((s) => s.locale)

  const [isCancel, setIsCancel] = useState(false)
  const [isTalking, setIsTalking] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartY = useRef(0)
  const elementRef = useRef<HTMLDivElement>(null)

  const debouncedEnd = debounce(() => {
    if (isTalking) {
      setIsTalking(false)
      sdkStopRecord(chatProRef)
    }
  }, 30)

  const startRecognize = () => {
    useStore.getState().setVoiceValue('')
    sdkStartRecord()

    if (navigator.vibrate) navigator.vibrate(100)
  }

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (loading) return

    const touch = e.touches[0]
    touchStartY.current = touch.clientY
    setIsCancel(false)
    useStore.getState().setVoiceValue('')
    useStore.getState().setVoiceTime(0)
    setIsTalking(true)

    timerRef.current = setTimeout(() => {
      startRecognize()
    }, 30)
  }

  const onTouchEnd = async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setIsTalking(false)

    if (isCancel) {
      debouncedEnd.cancel()
      sdkStopRecord()
      setTimeout(() => {
        useStore.getState().setVoiceValue('')
      }, 100)

      return
    }
    debouncedEnd()
  }

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!elementRef.current || !isTalking) return

    const touch = e.touches[0]
    const deltaY = touch.clientY - touchStartY.current
    const rect = elementRef.current.getBoundingClientRect()

    setIsCancel(Math.abs(deltaY) > CANCEL_THRESHOLD || touch.clientY < rect.top - CANCEL_THRESHOLD)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      debouncedEnd.cancel()
    }
  }, [])

  useEffect(() => {
    if (isCancel) {
      setTimeout(() => {
        useStore.getState().setVoiceValue('')
      }, 100)
    }
  }, [isCancel])

  return (
    <div
      onTouchMove={onTouchMove}
      onTouchStart={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}
      onContextMenu={(e) => e.preventDefault()}
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
    >
      <div
        className={classNames(`${prefix}-panel`, {
          red: isCancel && isTalking,
          show: isTalking,
        })}
      >
        {isCancel && isTalking ? locale('chat.voiceCancel') : locale('chat.voiceTip')}
      </div>

      <div
        ref={elementRef}
        className={classNames(`${prefix}-voice`, {
          show: showVoice,
          talking: isTalking,
          red: isCancel && isTalking,
        })}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {isTalking ? (
          <div className="voice-animation">
            <Player
              autoplay
              loop
              src={!isCancel ? VoiceLottie : VoiceStaticLottie}
              style={{ width: 180, height: 20 }}
              rendererSettings={{
                preserveAspectRatio: 'xMidYMid slice',
              }}
            />
          </div>
        ) : (
          <>
            <div className="text">{locale('chat.voiceStart')}</div>
            <div className="icon" onTouchStart={(e) => e.stopPropagation()}>
              {getSuffixIcon('voice')}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Voice
