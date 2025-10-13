import { StateCreator } from 'zustand'

import { StoreState } from './index'

import DEFAULT_LOCALE from '@/lang/zh_CN.json'

export type LocaleProps = typeof DEFAULT_LOCALE

export interface LocaleState {
  lang: string
  setLang: (v: string) => void
  localeInner: LocaleProps
  locale: (key: keyof LocaleProps) => string
  setLocale: (v: LocaleProps) => void
}

export const createLocaleSlice: StateCreator<StoreState, [['zustand/immer', never]], [], LocaleState> = (
  set,
  get,
  api,
) => ({
  lang: 'zh_CN',
  setLang: (v) => {
    set((s) => {
      s.lang = v
    })
  },
  localeInner: DEFAULT_LOCALE,
  locale: (key) => get().localeInner?.[key] || 'noData',
  setLocale: (v) => {
    set((s) => {
      s.localeInner = v
      s.locale = (key) => get().localeInner?.[key] || 'noData'
    })
  },
})
