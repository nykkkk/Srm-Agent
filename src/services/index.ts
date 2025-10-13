import { request } from 'umi'

export const getMockData = () => {
  return request('/mock/data')
}

export const getRecentAnalysis = () => {
  return request('/mock/recentAnalysis')
}
