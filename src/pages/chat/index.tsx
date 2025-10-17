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
import VoidInput from '@/components/InputInner/voidInput'
import DislikeModal from '@/components/DisLikeModal'
import ChatLoading from '@/components/ChatLoading'
// import Home from '@/components/Home'
import Home from '@/components/homepage'

import './index.less'

thinkComponentDeepseekRegistry()

const prefix = 'app'

const TopNavigation = () => {
  const hasChat = useStore((s) => s.hasChat)
  const chatProRef = useChatPro()

  const handleBack = () => {
    // 重置聊天状态
    chatProRef.resetMessage([])
    useStore.getState().setHasChat(false)
    // 如果有其他需要重置的状态，可以在这里添加
    // 例如：useStore.getState().setSomeState(initialValue)
  }

  return (
    <div className="top-navigation">
      <div className="navigation-content">
        {/* 在分析阶段显示返回按钮 */}
        {hasChat && (
          <div className="navigation-back" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 18L9 12L15 6"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
        <div className="navigation-title">采购智能风控智能体</div>
      </div>
    </div>
  )
}
// 新增的底部提示组件
const AIDisclaimer = () => {
  return <div className="ai-disclaimer">内容由AI生成，仅供参考，请仔细甄别</div>
}
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
    // return dom
    return <></>
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
    if (data?.type === 'robot') {
      return <div style={{ marginTop: 10 }}>{dom}</div>
    }
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
      <TopNavigation />
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
        // inputProps={{
        //   inputRender: () => <InputInner ref={inputRef} />,
        //   agentDisabled: true,
        // }}
        inputProps={{
          inputRender: () => <VoidInput />,
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
        iframeProps={{}}
        // ------type: typeof IFRAME;
        // prefixCls?: string;
        // className?: string;
        // content?: string;
        // style?: Record<string, unknown>;
        // src?: string;
        // title?: string;
        // onCompleted?: (isComplete: boolean) => void;
        dispatchTimer={{ singleTyping: 500 }}
        // genMessageId={() => `${new Date().getTime()}`}
      />
      {/* 在分析阶段显示AI免责声明 */}
      {hasChat && <AIDisclaimer />}
      {/* <div style={{ width: '1px' }} ref={bottomRef} /> */}
      {/* <DislikeModal {...{ dislikeData, visibleDisLike, setVisibleDisLike }} /> */}
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
