export const mockData = `
这是一段数据，这是一段数据，

# 这是一级标题\n
## 这是二级标题\n
### 这是三级标题\n
**这是加粗的文字**
\n
*这是斜体的文字*\n
***这是斜体加粗的文字***\n
~~这是加删除线的文字~~\n

**无序列表：**
  - 列表内容1
  - 列表内容2
  - 列表内容3
\n
***\n
**有序列表：**
  1. 列表内容1
  2. 列表内容2
  3. 列表内容3
\n
[这是一个链接](https://kux.kingdee.com/cui)
`

export const mockThinkCard = [
  {
    message: {
      type: 'top',
      status: 'create',
      title: '多Agents协作中...',
      agentNumber: [0, 0],
      process: 0,
    },
  },
  {
    message: {
      type: 'top',
      status: 'edit',
      title: '多Agents协作中....',
      agentNumber: [1, 4],
      process: 0,
    },
  },
  {
    message: {
      type: 'center',
      title: '行程规划分析 Agent',
      status: 'create',
    },
  },
  {
    message: {
      id: '1',
      type: 'center',
      title: '行程规划分析 Agent',
      subtitle: '接收用户任务',
      content: '',
      process: 50,
      status: 'create',
    },
  },
  {
    message: {
      id: '1',
      type: 'center',
      content: '识别用户意图：生成差旅出行方案',
      process: 100,
      status: 'eidt',
    },
  },
  {
    message: {
      id: '2',
      type: 'center',
      title: '行程规划分析 Agent',
      subtitle: '接收用户任务1',
      content: '',
      process: 50,
      status: 'create',
    },
  },
  {
    message: {
      id: '2',
      type: 'center',
      content: '识别用户意图：生成差旅出行方案1',
      process: 100,
      status: 'edit',
    },
  },
  {
    message: {
      id: `31`,
      type: 'bottom',
      title: '去程机票预定 Agent',
      subtitle: '筛选合适的去程机票信息',
      process: 50,
      status: 'create',
      content: ``,
    },
  },
  {
    message: {
      id: `31`,
      type: 'bottom',
      status: 'edit',
      content: `经三重唯独筛选：
    1.首要考量：本场最短飞行时长（2小时55分钟，较平均值减少15%时长）`,
    },
  },
  {
    message: {
      id: `31`,
      type: 'bottom',
      status: 'edit',
      content: `2.关键优势：黄金时段起降（06:25-08:20，符合商旅作息规律）`,
    },
  },
  {
    message: {
      id: `31`,
      type: 'bottom',
      status: 'edit',
      process: 100,
      content: `3.附加价值：直飞航班保障，避免中转耗时（经比对含中转航班平均增加4.5小时）`,
    },
  },
  {
    message: {
      id: `313`,
      type: 'bottom',
      title: '去程机票预定 Agent',
      subtitle: '筛选合适的去程机票信息',
      process: 50,
      status: 'create',
      content: ``,
    },
  },
  {
    message: {
      id: `313`,
      type: 'bottom',
      status: 'edit',
      content: `经三重唯独筛选：
    1.首要考量：本场最短飞行时长（2小时55分钟，较平均值减少15%时长）`,
    },
  },
  {
    message: {
      id: `313`,
      type: 'bottom',
      status: 'edit',
      content: `2.关键优势：黄金时段起降（06:25-08:20，符合商旅作息规律）`,
    },
  },
  {
    message: {
      id: `313`,
      type: 'bottom',
      status: 'edit',
      process: 100,
      content: `3.附加价值：直飞航班保障，避免中转耗时（经比对含中转航班平均增加4.5小时）`,
    },
  },
  {
    message: {
      type: 'top',
      status: 'edit',
      title: '多Agents协作中...',
      agentNumber: [4, 4],
      process: 100,
    },
  },
]

import { Supplier } from '@/components/Search'
export const recentAnalysis = [
  {
    id: 1,
    companyName: '深圳德稳电子科技有限公司',
    creditCode: '910000091212221311',
    date: '2025年10月10日',
    riskLevel: 'high', // high, medium, low
  },
  {
    id: 2,
    companyName: '大疆创新公司',
    creditCode: '910000091212221311',
    date: '2025年10月11日',
    riskLevel: 'medium',
  },
  {
    id: 3,
    companyName: '大疆创新公司',
    creditCode: '910000091212221311',
    date: '2025年10月11日',
    riskLevel: 'medium',
  },
]

export const mockSuppliers: Supplier[] = [
  { id: '1', companyName: '阿里巴巴集团', creditCode: '91330100MA2J4R4K0X' },
  { id: '2', companyName: '腾讯科技', creditCode: '91440300MA5FQ0QY6R' },
  { id: '3', companyName: '百度在线', creditCode: '911101087000000000' },
  { id: '4', companyName: '京东集团', creditCode: '91110302MA006YQY0F' },
  { id: '5', companyName: '华为技术', creditCode: '914403001922298216' },
  { id: '6', companyName: '小米科技', creditCode: '91110108MA006YQY0F' },
  { id: '7', companyName: '字节跳动', creditCode: '91110105MA7BQYQY0F' },
]

export const mockWsUrl = [
  {
    code: 200,
    message: 'success',
    data: { wsUrl: 'wss://chat.example.com' },
  },
]
