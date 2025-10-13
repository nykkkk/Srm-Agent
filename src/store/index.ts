import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { BaseState, createBaseSlice } from './baseSlice'
import { IS_DEV } from '@/constant'
import { createLocaleSlice, LocaleState } from './localeSlice'
import { createInputSlice, InputState } from './inputSlice'

export type StoreState = BaseState & LocaleState & InputState

export const useStore = create<StoreState>()(
  devtools(
    immer((...a) => ({
      ...createBaseSlice(...a),
      ...createLocaleSlice(...a),
      ...createInputSlice(...a),
    })),
    { name: 'AppStore', enabled: IS_DEV },
  ),
)
