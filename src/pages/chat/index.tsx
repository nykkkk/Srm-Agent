import React, { useEffect, useRef } from 'react'

import {
  ChatMessage,
  ChatPro,
  ChatState,
  HistoryState,
  useChatPro,
  thinkComponentDeepseekRegistry,
  ChatProProvider,
} from '@kdcloudjs/kdesign-chatui'
import { useImmer as useState } from 'use-immer'
import classNames from 'classnames'

import { useStore } from '@/store'
import { C_LOADING } from '@/constant'
import { request } from '@/services/websocket'
import { customerCardRender } from '@/customCard'
import InputInner from '@/components/InputInner'
import DislikeModal from '@/components/DisLikeModal'
import ChatLoading from '@/components/ChatLoading'
import Home from '@/components/Home'

import './index.less'

thinkComponentDeepseekRegistry()

const prefix = 'app'

const App = () => {
  const chatProRef = useChatPro()

  const locale = useStore((s) => s.locale)
  const hasChat = useStore((s) => s.hasChat)
  const loading = useStore((s) => s.loading)

  const historyList = useStore((s) => s.historyList)
  const historyOpen = useStore((s) => s.historyOpen)
  const fileList = useStore((s) => s.fileList)

  const inputRef = useRef<any>(null)
  const bottomRef = useRef<any>(null)
  const [visibleDisLike, setVisibleDisLike] = useState(false)
  const [dislikeData, setDislikeData] = useState<any>({})
  const isEmpty = !hasChat && !fileList.length

  const onToolsClick: ChatState['onToolsClick'] = (type, data, payload) => {
    if (type === 'like' || type === 'dislike') {
      const li = data?.like?.value
      const di = data?.dislike?.value
      if (type == 'dislike') {
        const v = data?.dislike?.value
        if (v) {
          const d = { dislike: { value: false }, like: { value: li } }
          chatProRef.setChatMessages(data?.id, d)
        } else {
          setDislikeData(data)
          setVisibleDisLike(true)
        }
      } else {
        const d = li
          ? { like: { value: false }, dislike: { value: di } }
          : { like: { value: true }, dislike: { value: false } }
        chatProRef.setChatMessages(data?.id as any, d)
      }
    }
  }

  const toolsRender: ChatState['toolsRender'] = ({ cardData }, dom, { className, tools }) => {
    return dom
  }

  const cardExtraInnerRender: ChatState['cardExtraInnerRender'] = (data, isLast) => {
    const hasLoading = data?.msg.find((c) => c.type === C_LOADING)
    if (loading && isLast && data?.type === 'robot' && hasLoading && data.msgType !== 'done') {
      return <ChatLoading />
    }
    return null
  }

  const contentFormat = (content: string) => {
    return content
  }

  const chatCardRender: ChatState['chatCardRender'] = (data, dom, isLast) => {
    return dom
  }

  const InfiniteScrollContent = ({ hasMore }: { hasMore?: boolean }) => {
    return <span>--- {'noMore'} ---</span>
  }

  const history: HistoryState = {
    open: historyOpen,
    onOpenChange(open) {
      useStore.getState().setHistoryOpen(open)
    },
    // activeId: sessionId,
    onActiveChange: (id) => {
      console.log(id)
    },
    list: historyList,
    infiniteScrollProps: {
      hasMore: false,
      children: <InfiniteScrollContent />,
    },
    pullToRefreshProps: {
      onRefresh: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true)
          }, 500)
        })
      },
      pullingText: locale('pullingText'),
      canReleaseText: locale('canReleaseText'),
      refreshingText: locale('refreshingText'),
      completeText: locale('completeText'),
    },
    onClick: (type, item, payload) => {
      console.log(type, item, payload)
    },
  }

  useEffect(() => {
    chatProRef?.resetMessage([])
  }, [])

  return (
    <div
      className={classNames(prefix, {
        home: isEmpty,
        ding: true,
      })}
      style={{ height: '100vh' }}
    >
      <ChatPro
        mode="mobile"
        chatsBeginTop
        chatCardPosition="alternate"
        history={history}
        loading={loading}
        userMeta={{ avatar: null, name: null }}
        robotMeta={{ avatar: null, name: null }}
        onChatsChange={(data) => useStore.getState().setHasChat(data.length > 0)}
        request={() => request({ chatProRef })}
        inputProps={{
          inputRender: () => <InputInner ref={inputRef} />,
          agentDisabled: true,
        }}
        toolsRender={toolsRender}
        privacyRender={() => null}
        // privacyRender={() => <Privacy btnRef={btnRef} invoke={invoke} />}
        onLoadingChange={(v) => useStore.getState().setLoading(v)}
        chatCardRender={chatCardRender}
        onToolsClick={onToolsClick}
        recommendRender={<Home />}
        cardLoadingRender={() => <ChatLoading />}
        cardExtraInnerRender={cardExtraInnerRender}
        headerMeta={{ headerRender: () => null }}
        loadingRender={() => null}
        container={{ enable: false }}
        customerCardRender={customerCardRender}
        markdownProps={{ showThinkComponent: true, contentFormat }}
        dispatchTimer={{ singleTyping: 500 }}
        // genMessageId={() => `${new Date().getTime()}`}
      />
      <div style={{ width: '1px' }} ref={bottomRef} />
      <DislikeModal {...{ dislikeData, visibleDisLike, setVisibleDisLike }} />
    </div>
  )
}

export default () => {
  return (
    <ChatProProvider>
      <App />
    </ChatProProvider>
  )
}
