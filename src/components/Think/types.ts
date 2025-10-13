import { WebSocketMessage } from '@/services/connect'

// types.ts
export interface AgentMessage {
  id: string
  type: 'title' | 'subtitle' | 'text' | 'agent' | 'step' | 'divider' | 'progress'
  content: string
  level?: number
  status?: 'thinking' | 'completed' | 'processing' | 'waiting'
  agentName?: string
  steps?: string[]
  progress?: number // 进度百分比
  delay?: number // 延迟显示
}

export interface ThinkingProcessProps {
  messages: WebSocketMessage[]
  onComplete?: () => void
  speed?: number
  showCursor?: boolean
  autoStart?: boolean
  onMessageComplete?: (messageId: string) => void
}
