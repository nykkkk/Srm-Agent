// stores/websocketStore.ts
import { create } from 'zustand'

interface WebSocketStore {
  isConnected: boolean
  messages: any[]
  sendMessage: (message: any) => void
  addMessage: (message: any) => void
  setConnectionStatus: (status: boolean) => void
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  isConnected: false,
  messages: [],
  sendMessage: (message) => {
    // 实际发送逻辑在 WebSocketProvider 中实现
  },
  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }))
  },
  setConnectionStatus: (status) => {
    set({ isConnected: status })
  },
}))
