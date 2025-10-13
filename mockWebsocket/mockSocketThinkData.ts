import { AgentMessage } from '.././src/components/Think/types'
export const completeThinkingProcess: AgentMessage[] = [
  {
    id: '1',
    type: 'title',
    content: '多Agents协作中... (1/4)',
    delay: 500,
  },
  {
    id: '2',
    type: 'subtitle',
    content: '行程规划分析 Agent',
    delay: 300,
  },
  {
    id: '3',
    type: 'text',
    content: '- 接收用户任务  \n  识别用户意图：生成差旅出行方案',
    delay: 200,
  },
  {
    id: '4',
    type: 'text',
    content: '- 接收用户任务1  \n  识别用户意图：生成差旅出行方案1',
    delay: 200,
  },
  {
    id: '5',
    type: 'divider',
    content: '',
    delay: 300,
  },
  {
    id: '6',
    type: 'agent',
    agentName: '去程机票预定 Agent',
    status: 'completed',
    content: '筛选合适的去程机票信息',
    delay: 400,
  },
  {
    id: '7',
    type: 'step',
    content: '筛选合适的去程机票信息',
    steps: [
      '经三重唯独筛选：1. 首要考量：本场最短飞行时长（2小时55分钟，较平均值减少15%时长）',
      '关键优势：黄金时段起降（06:25-08:20，符合商旅作息规律）',
      '附加价值：直飞航班保障，避免中转耗时（经过以合中转航班平均增加4.5小时）',
    ],
    delay: 100,
  },
  {
    id: '8',
    type: 'agent',
    agentName: '去程机票预定 Agent',
    status: 'completed',
    content: '筛选合适的去程机票信息',
    delay: 300,
  },
  {
    id: '9',
    type: 'step',
    content: '筛选合适的去程机票信息',
    steps: ['经三重唯独筛选：1. 首要考量：本场最短飞行时长（2小时55分钟，较平均值减少15%时长）'],
    delay: 400,
  },
  {
    id: '10',
    type: 'progress',
    content: '行程规划完成进度',
    progress: 100,
    delay: 500,
  },
]
