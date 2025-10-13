import React, { useEffect, useMemo, useRef } from 'react'
import classNames from 'classnames'
import { useImmer as useState } from 'use-immer'
import { Icon, Toast, Progress, Image, Upload, Message } from 'kdesign-mobile'
import { UploadFile } from 'kdesign-mobile/lib/upload/interface'
import { useChatPro } from '@kdcloudjs/kdesign-chatui'
import { useStore } from '@/store'
import { scrollToBottom } from '@/utils'
import './index.less'

import qImg from './img/erweima.svg'
import fImg from './img/a-wenjianjiawenjian.svg'
import { IS_DEV } from '@/constant'
import { isRealMobile } from '@/utils/platform'

export const getFileType = (file: any) => {
  switch (file.type) {
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
      return (
        <div className="picture">
          <Image name={file.name} src={file.url} style={{ width: '100%', height: '100%' }} />
        </div>
      )
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.ms-excel':
      return <div className="excel">X</div>
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    case 'application/vnd.ms-powerpoint':
    case 'application/pdf':
      return <div className="ppt">P</div>
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/msword':
      return <div className="word">W</div>
    default:
      return (
        <div className="file">
          <Icon type="attachment" />
        </div>
      )
  }
}

const cameraInput = { type: 'file', accept: 'image/*', apture: 'environment' }
const albumInput = { type: 'file', accept: '.jpg,.jpeg,.png' }
const fileInput = { type: 'file', accept: '.pdf,.doc,.docx,.wps,.bmp,.jpg,.jpeg,.png' }
const accept = '.pdf,.doc,.docx,.wps,.bmp,.jpg,.jpeg,.png'

export const UploadButton = (props: any) => {
  const { prefix: p, multiple = true } = props

  const chatProRef = useChatPro()
  const fileList = useStore((s) => s.fileList)
  const locale = useStore((s) => s.locale)
  const loading = useStore((s) => s.loading)
  const showUpload = useStore((s) => s.showUpload)

  const prefix = `${p}-inner-input-upload`

  const uploadRef = useRef<any>(null)
  const cameraRef = useRef<any>(null)
  const bottomRef = useRef(null)

  const isLong = fileList.find((f) => !`${f.type}`.startsWith('image/') && f.name.split('.')[0].length > 8)
  const isAllPicture = !fileList.find((file) => !`${file.type}`.startsWith('image/'))
  const hasAdd = !(fileList && fileList.length >= 8)
  const is56 = isAllPicture || !isLong
  const height = loading || !showUpload ? 0 : fileList.length <= 0 ? 45 : 'auto'
  const marginBottom = height === 0 ? 0 : undefined
  const pointerEvents = height === 0 ? 'none' : undefined
  const opacity = height === 0 ? 0 : 1

  const action = IS_DEV
    ? '/attachment/uploadFile.do'
    : `${window.location.href.split('/mobile.html')[0]}/attachment/uploadFile.do`

  const onButtonClick = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream && isRealMobile() && !IS_DEV

    setTimeout(() => {
      uploadRef.current?.input.current.click()
      if (isIOS) {
        uploadRef.current?.input.current.click()
      }
    }, 200)
  }

  const onRemove = (f: any) => {
    const index = fileList.indexOf(f)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)
    useStore.getState().setFileList(newFileList)
  }

  const onError = (v?: any) => {
    Toast.show({ content: typeof v === 'string' && v ? v : locale('requestFailed'), duration: 2000 })
  }

  const onSuccess = (res: any, file: any) => {
    if (res?.status !== 'success') {
      onError(res?.description)
      useStore.getState().setFileStatus(file.uid, 'error')
    }
  }

  const onInputChange = (e: any) => {
    uploadRef.current.onChange(e)
    e.target.value = ''
  }

  const beforeUpload = (f: File, fl: File[]) => {
    return new Promise((resolve, reject) => {
      resolve(f)
    })
  }

  const onChange = ({ fileList: f }: any) => {
    useStore.getState().setFileList(f)
    setTimeout(() => {
      scrollToBottom(bottomRef)
    }, 20)
    setTimeout(() => {
      chatProRef.scrollToBottom()
    }, 40)
  }

  useEffect(() => {
    if (fileList.length) {
      scrollToBottom(bottomRef)

      setTimeout(() => {
        chatProRef.scrollToBottom(true)
      }, 20)
    }
  }, [fileList])

  return (
    <div className={classNames(`${prefix}`)} style={{ height, marginBottom, pointerEvents, opacity }}>
      <div className={classNames(`${prefix}-button`, { show: fileList.length === 0 })}>
        <div className={classNames(`${prefix}-button-list`)}>
          <div onClick={onButtonClick} style={{ height }}>
            <img src={fImg} alt="" />
            <div>{locale('file')}</div>
          </div>
        </div>
      </div>

      <div className={classNames(`${prefix}-main`, { show: fileList.length > 0 })}>
        {fileList.map((file) => {
          const isPicture = `${file.type}`.startsWith('image/')

          return (
            <div key={file?.uid} className={classNames(`${prefix}-main-item`)}>
              {isPicture ? (
                <div
                  className={classNames(`${prefix}-main-item-img`, {
                    [`${prefix}-main-item-5656`]: is56,
                    [`${prefix}-main-item-7474`]: !is56,
                  })}
                >
                  <Image name={file.name} src={file.url} style={{ width: '100%', height: '100%' }} />
                </div>
              ) : isLong ? (
                <div
                  className={classNames(`${prefix}-main-item-file-long`, {
                    [`${prefix}-main-item-56`]: is56,
                    [`${prefix}-main-item-74`]: !is56,
                  })}
                >
                  <div>{file.name}</div>
                  <div>
                    {getFileType(file)}
                    <div>{((file?.size || 0) / 1024).toFixed(2)}KB</div>
                  </div>
                </div>
              ) : (
                <div
                  className={classNames(`${prefix}-main-item-file`, {
                    [`${prefix}-main-item-56`]: is56,
                    [`${prefix}-main-item-74`]: !is56,
                  })}
                >
                  {getFileType(file)}
                  <div>
                    <div>{file.name}</div>
                    <div>{((file?.size || 0) / 1024).toFixed(2)}KB</div>
                  </div>
                </div>
              )}

              {file.status === 'uploading' && (
                <div className={classNames(`${prefix}-main-item-mask`)}>
                  <div>
                    <Progress
                      percent={file?.percent ? Number(file.percent.toFixed(2)) : 0}
                      width={24}
                      strokeWidth={6}
                      type="circle"
                      showInfo={false}
                    />
                  </div>
                </div>
              )}

              {['error', 'notStart'].includes(file.status || '') && (
                <div className={classNames(`${prefix}-main-item-mask`, 'error')}>
                  <div>
                    <Icon type="warning" />
                  </div>
                </div>
              )}

              <div className={classNames(`${prefix}-main-item-close`)} onClick={() => onRemove(file)}>
                <div>
                  <Icon type="close-bold" />
                </div>
              </div>
            </div>
          )
        })}

        {hasAdd && (
          <div className={classNames(`${prefix}-main-item`, 'add')} onClick={onButtonClick}>
            <Icon type="add" style={{ fontSize: 18, color: '#666', fontWeight: 'bolder' }} />
          </div>
        )}

        <div ref={bottomRef} style={{ height: '1px', flexShrink: 0 }} />
      </div>

      <div style={{ display: 'none' }}>
        <input
          type="file"
          ref={cameraRef}
          accept={accept}
          onChange={(e) => {
            uploadRef.current.onChange(e)
          }}
        />
        <Upload
          ref={uploadRef}
          action={action}
          fileList={fileList}
          onChange={onChange}
          onError={onError}
          onRemove={onRemove}
          onSuccess={onSuccess}
          beforeUpload={beforeUpload as any}
          showUploadList={false}
          multiple={multiple}
          withCredentials
          inputProps={{
            type: 'file',
            accept,
            onChange: onInputChange,
          }}
        >
          <div />
        </Upload>
      </div>
    </div>
  )
}
