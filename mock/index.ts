const recentAnalysis = [
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
]

export default {
  '/mock/data': [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' },
  ],
  '/mock/recentAnalysis': recentAnalysis,
}
