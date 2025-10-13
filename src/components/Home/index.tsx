import React, { useMemo, useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import { Icon } from 'kdesign-mobile'

import { useStore } from '@/store'

import './index.less'

const Home = () => {
  const hasChat = useStore((s) => s.hasChat)
  const fileList = useStore((s) => s.fileList)

  const home = (
    <div className="app-home" onClick={() => useStore.getState().setHistoryOpen(true)}>
      <div className="app-home-bg" />
      <div className="app-home-main">
        <div className={classNames('img')} />
        <div className="title">Hi~</div>
        <div className="subtitle">
          <div>Jack</div>
          <Icon type="arrow-down-solid" />
        </div>
      </div>
    </div>
  )

  return hasChat || fileList.length > 0 ? null : home
}

export default Home
