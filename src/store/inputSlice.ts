import { StateCreator } from 'zustand'
import { UploadFile, UploadFileStatus } from 'kdesign-mobile/lib/upload/interface'

import { StoreState } from './index'

export interface InputState {
  inputValue: string
  setInputValue: (v: string) => void

  showUpload: boolean
  setShowUpload: (v: boolean) => void

  voiceValue: string
  setVoiceValue: (v: string) => void

  voiceTime: number
  setVoiceTime: (v: number) => void

  fileList: UploadFile[]
  setFileList: (v: UploadFile[]) => void
  setFileStatus: (v: string, status?: UploadFileStatus) => void
}

export const createInputSlice: StateCreator<StoreState, [['zustand/immer', never]], [], InputState> = (
  set,
  get,
  api,
) => ({
  inputValue: '',
  setInputValue: (v) => {
    set((s) => {
      s.inputValue = v
    })
  },

  showUpload: false,
  setShowUpload: (v) => {
    set((s) => {
      s.showUpload = v
    })
  },

  voiceValue: '',
  setVoiceValue: (v) => {
    set((s) => {
      s.voiceValue = v
    })
  },

  voiceTime: 0,
  setVoiceTime: (v) => {
    set((s) => {
      s.voiceTime = v
    })
  },

  fileList: [],
  setFileList: (v) => {
    set((s) => {
      s.fileList = v
    })
  },
  setFileStatus: (v, status = 'error') => {
    set((s) => {
      const t = s.fileList.find((d) => d.uid === v)
      if (t) {
        t.status = status
      }
    })
  },
})
