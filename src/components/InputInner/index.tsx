import React, { useState, useRef, useEffect, FunctionComponentElement, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'
import { Toast, TextArea } from 'kdesign-mobile'
import { BaseMessage, ChatMessage, useChatPro } from '@kdcloudjs/kdesign-chatui'

import { voiceSvg, addSvg, sendSvg, stopSvg, keyboardSvg } from '@/constant/icon'

import Voice from './voice'
import { UploadButton } from './upload'
import './index.less'

import { useStore } from '@/store'
import { C_FILE } from '@/constant'

export interface IChatInputProps {
  onFocus?: any
  onBlur?: any
  bottomRef?: any
}

const NUMBER_OF_LINES = 3

const InputInner = (
  props: IChatInputProps,
  ref: React.Ref<unknown> | undefined,
): FunctionComponentElement<IChatInputProps> => {
  const locale = useStore((s) => s.locale)
  const loading = useStore((s) => s.loading)
  const hasChat = useStore((s) => s.hasChat)
  const fileList = useStore((s) => s.fileList)
  const inputValue = useStore((s) => s.inputValue)
  const showUpload = useStore((s) => s.showUpload)
  const disabled = loading
  const fileDoneList = (fileList || []).filter((d) => d.status === 'done')

  const prefix = 'kdcui-chat-input'

  const chatProRef = useChatPro()

  const textareaRef = useRef<any>(null)
  const textareaWrapperRef = useRef<HTMLDivElement>(null)
  const calculateWidthRef = useRef<HTMLDivElement>(null)
  const suffixRef = useRef<HTMLDivElement>(null)

  const [showVoice, setShowVoice] = useState(false)
  const [lineFeed, setLineFeed] = useState<boolean>(false)
  const [showCounter, setShowCounter] = useState(false)
  const [inputFocus, setInputFocus] = useState<boolean>(false)

  const onSend = (v = undefined) => {
    if (disabled) return null

    const message = v ?? (inputValue || '')

    if (!message && fileDoneList.length <= 0) {
      Toast.show({ content: locale('chat.inputEmpty'), duration: 2000 })
      return
    }

    const temp: BaseMessage = [{ type: 'user', msg: [] }]
    if (message) {
      temp[0].msg.push({ type: 'markdown', content: message })
    }

    if (fileDoneList.length > 0) {
      const content: ChatMessage['msg'] = []
      fileDoneList.forEach((f, i) => {
        content.push({ id: f.uid, name: f.name, type: f.type, url: f?.response.url, size: f.size })
      })
      temp[0].msg.push({ type: C_FILE, content })
    }

    chatProRef.startGenerateMessage(temp)
    setTimeout(() => {
      useStore.getState().setInputValue('')
      textareaRef.current?.blur()
      useStore.getState().setFileList([])
      useStore.getState().setShowUpload(false)
    }, 20)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (disabled) return null

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  const onFocus = () => {
    props?.onFocus?.()
    setInputFocus(true)
  }

  const onBlur = () => {
    props?.onBlur?.()
    setInputFocus(false)
  }

  const onVoice = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled) return

    setShowVoice(!showVoice)
  }

  const onAdd = () => {
    if (disabled) return null

    useStore.getState().setFileList([])
    useStore.getState().setShowUpload(!showUpload)

    const { containerRef } = chatProRef.getStore()
    const listDom = containerRef?.current?.chatListRef.current?.chatListRef.current

    if (listDom) {
      const { scrollTop, clientHeight, scrollHeight } = listDom as any
      const atBottom = scrollHeight - (scrollTop + clientHeight) <= 10

      if (atBottom) {
        setTimeout(() => {
          chatProRef.scrollToBottom()
        }, 300)
      }
    }
  }
  const onStop = () => {
    chatProRef.stopGenerateMessage()
    setTimeout(() => useStore.getState().setInputValue(''), 20)
  }

  const getSuffixIcon = (type = 'text') => {
    const style = {} // { width: 24, height: 24 }
    if (loading) {
      return (
        <span className="input-icon stop" onClick={onStop} style={{ ...style, marginRight: 0 }}>
          {stopSvg}
        </span>
      )
    }

    if (type === 'voice') {
      return (
        <>
          <span
            className="input-icon"
            style={{ ...style }}
            onClick={() => setShowVoice(false)}
            onTouchStart={(e) => {
              e.stopPropagation()
            }}
          >
            {keyboardSvg}
          </span>
          {fileList.length > 0 ? (
            <span
              className="input-icon"
              onClick={() => onSend()}
              style={{ ...style, opacity: fileDoneList.length > 0 ? 1 : 0.5 }}
            >
              {sendSvg}
            </span>
          ) : (
            <span
              className={classNames('input-icon', `${prefix}-inner-input-add`, { close: showUpload && !loading })}
              style={{ ...style }}
              onClick={onAdd}
            >
              {addSvg}
            </span>
          )}
        </>
      )
    } else {
      // eslint-disable-next-line no-lonely-if
      if (inputValue) {
        return (
          <span className="input-icon" onClick={() => onSend()} style={{ ...style, marginRight: 0 }}>
            {sendSvg}
          </span>
        )
      } else {
        return (
          <>
            <span className="input-icon" onClick={onVoice} style={{ ...style }}>
              {voiceSvg}
            </span>
            {fileList.length > 0 ? (
              <span
                className="input-icon"
                onClick={() => onSend()}
                style={{ ...style, opacity: fileDoneList.length > 0 ? 1 : 0.5 }}
              >
                {sendSvg}
              </span>
            ) : (
              <span
                className={classNames('input-icon', `${prefix}-inner-input-add`, { close: showUpload && !loading })}
                style={{ ...style }}
                onClick={onAdd}
              >
                {addSvg}
              </span>
            )}
          </>
        )
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (!textareaRef.current) return
      const textareaStyle = getComputedStyle(textareaRef.current)
      const textareaLineHeight = parseInt(textareaStyle.lineHeight, 10)
      const textareaPadding = parseFloat(textareaStyle.paddingTop) + parseFloat(textareaStyle.paddingBottom)
      const scrollHeight = textareaRef.current.offsetHeight - textareaPadding
      const numberOfLines = scrollHeight / textareaLineHeight
      setShowCounter(numberOfLines >= NUMBER_OF_LINES)

      const horizontalPadding = parseFloat(textareaStyle.paddingLeft) + parseFloat(textareaStyle.paddingRight)
      if (!calculateWidthRef.current || !textareaWrapperRef.current) return
      const suffixWidth = suffixRef.current ? suffixRef.current.offsetWidth : 0
      const textareaWrapperStyle = getComputedStyle(textareaWrapperRef.current)
      if (
        inputValue &&
        calculateWidthRef.current.offsetWidth + suffixWidth + horizontalPadding >
          textareaWrapperRef.current?.offsetWidth -
            parseFloat(textareaWrapperStyle.paddingRight) -
            parseFloat(textareaWrapperStyle.paddingLeft)
      ) {
        setLineFeed(true)
      } else {
        setLineFeed(false)
      }

      if (inputValue && numberOfLines >= 2) {
        setLineFeed(numberOfLines >= 2)
      }
    }, 0)
  }, [inputValue])

  useImperativeHandle(ref, () => {
    return {
      setInputValue: (v: string) => {
        setShowVoice(false)
        useStore.getState().setInputValue(v)
      },
      input: textareaRef.current,
      focus: () => {
        setInputFocus(true)
        textareaRef.current?.focus()
      },
      blur: () => {
        setInputFocus(false)
        textareaRef.current?.blur()
      },
      select: () => {
        textareaRef.current?.select()
      },
      onSend,
    }
  })

  return (
    <div>
      <UploadButton prefix={prefix} />
      {showVoice && <Voice {...{ loading, showVoice, getSuffixIcon, prefix, onSend }} />}

      <div className={classNames(`${prefix}-inner-input`, { upload: showUpload, show: !showVoice })}>
        <div
          className={classNames(`${prefix}-wrapper`, `${prefix}-wrapper-mobile`, {
            [`${prefix}-wrapper-disabled`]: disabled,
            [`${prefix}-wrapper-focus`]: inputFocus,
            show: !showVoice,
          })}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              className={classNames(`${prefix}`, `${prefix}-mobile`, {
                [`${prefix}-counter`]: showCounter,
                [`${prefix}-typing`]: inputValue?.length && !loading,
              })}
              ref={textareaWrapperRef}
            >
              <div
                style={{
                  display: 'flex',
                  flexGrow: 1,
                  alignItems: 'center',
                  width: lineFeed ? '100%' : 'unset',
                  marginBottom: lineFeed ? 8 : 'unset',
                }}
              >
                <TextArea
                  {...({
                    onKeyDown,
                    value: inputValue,
                    placeholder: locale('placeholder'),
                    onFocus,
                    onBlur,
                    count: false,
                    onChange: (e) => useStore.getState().setInputValue(e.target.value),
                    maxLength: 2000,
                    ref: textareaRef,
                    borderType: 'none',
                    disabled,
                    autoSize: {
                      minRows: 1,
                      maxRows: 10,
                    },
                  } as any)}
                />
              </div>
              <div className="calculateWidth" ref={calculateWidthRef}>
                {inputValue}
              </div>
              {showCounter ? <div className="count">{`${inputValue?.length} / 2000`}</div> : null}
              <div
                className={`${prefix}-suffix`}
                ref={suffixRef}
                onFocus={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
              >
                {getSuffixIcon()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: '1px' }} ref={props?.bottomRef} />
    </div>
  )
}

export default forwardRef<unknown, IChatInputProps>(InputInner)
