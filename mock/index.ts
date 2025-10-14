import { recentAnalysis, mockSuppliers, mockWsUrl } from '../mockWebsocket/mockSocketData'
export default {
  '/mock/data': [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' },
  ],
  '/mock/recentAnalysis': recentAnalysis,
  '/mock/initWebsocketUrl': mockWsUrl,
  'GET /api/suppliers/search': (req: any, res: any) => {
    const { q } = req.query // 获取查询参数

    console.log('搜索关键词:', q)

    if (!q || !q.trim()) {
      return res.json([])
    }

    const filteredSuppliers = mockSuppliers.filter(
      (supplier) =>
        supplier.companyName.toLowerCase().includes(q.toLowerCase()) ||
        supplier.creditCode.toLowerCase().includes(q.toLowerCase()),
    )

    console.log('搜索结果数量:', filteredSuppliers.length)
    return res.json(filteredSuppliers)
  },
}
