import { StateCreator } from 'zustand'
import { HistoryItem } from '@kdcloudjs/kdesign-chatui'

import { StoreState } from './index'
import { IS_DEV } from '@/constant'

export interface BaseState {
  globalLoading: boolean
  setGlobalLoading: (v: boolean) => void

  loading: boolean
  setLoading: (v: boolean) => void

  hasChat: boolean
  setHasChat: (v: boolean) => void

  wsUrl: string
  setWsUrl: (v: string) => void

  token: string
  setToken: (v: string) => void

  historyOpen: boolean
  setHistoryOpen: (v: boolean) => void
  historyList: HistoryItem[]
  setHistoryList: (v: HistoryItem[]) => void
  delHistory: (id: string) => void
  reNameHistory: (id: string, title: string) => void
}

export const createBaseSlice: StateCreator<StoreState, [['zustand/immer', never]], [], BaseState> = (
  set,
  get,
  api,
) => ({
  globalLoading: false,
  setGlobalLoading: (v) => {
    set((s) => {
      s.globalLoading = v
    })
  },

  loading: false,
  setLoading: (v) => {
    set((s) => {
      s.loading = v
    })
  },

  hasChat: false,
  setHasChat: (v) => {
    if (v !== get().hasChat) {
      set((s) => {
        s.hasChat = v
      })
    }
  },

  wsUrl: '',
  setWsUrl: (v) => {
    set((s) => {
      s.wsUrl = v
    })
  },

  token: '',
  setToken: (v) => {
    set((s) => {
      s.token = v
    })
  },

  historyOpen: false,
  setHistoryOpen: (v) => {
    set((s) => {
      s.historyOpen = v
    })
  },
  historyList: [],
  setHistoryList: (v) => {
    set((s) => {
      s.historyList = v
    })
  },
  delHistory: (v) => {
    set((s) => {
      s.historyList = s.historyList.filter((d) => d.id !== v)
    })
  },
  reNameHistory: (id, title) =>
    set((s) => {
      const t = s.historyList.find((d) => d.id === id)
      if (t) {
        t.title = title
      }
    }),
})
