import React, { useEffect, useState } from 'react'
import { useChatPro } from '@kdcloudjs/kdesign-chatui'
import { Button, TextArea, Modal } from 'kdesign-mobile'

import bad from './bad.svg'
import { useStore } from '@/store'

const prefix = 'app'
const DislikeModal = (props: any) => {
  const { visibleDisLike, setVisibleDisLike, dislikeData: data } = props
  const locale = useStore((s) => s.locale)
  const chatProRef = useChatPro()
  const [value, setValue] = useState('')

  const onAction = (_, index: any) => {
    if (index === 1) {
      const d = { like: { value: false }, dislike: { value: true } }
      chatProRef.setChatMessages(data.id, d)
    }
  }

  useEffect(() => {
    setValue('')
  }, [visibleDisLike])

  return (
    <Modal
      title={
        <div className={`${prefix}-dislike-modal-title`}>
          <img src={bad} alt="" />
          <div>{locale('chat.dislikeTitle')}</div>
        </div>
      }
      onClose={() => {
        setVisibleDisLike(false)
      }}
      onAction={onAction}
      visible={visibleDisLike}
      actions={[
        {
          key: '1',
          text: locale('cancel'),
        },
        {
          key: '2',
          text: locale('confirm'),
          primary: true,
        },
      ]}
      content={
        <div className={`${prefix}-dislike-modal-body`}>
          <TextArea
            value={value}
            onChange={(e) => {
              setValue(e.target.value || '')
            }}
            autoSize={{
              minRows: 4,
              maxRows: 4,
            }}
            countPosition="inner"
            maxLength={100}
            placeholder={locale('chat.dislikePlaceholder')}
            borderType="bordered"
          />
        </div>
      }
    />
  )
}

export default DislikeModal
