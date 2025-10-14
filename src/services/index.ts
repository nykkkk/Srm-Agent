import { request } from 'umi'

export const getMockData = () => {
  return request('http://localhost:8000/mock/data')
}

export const getRecentAnalysis = () => {
  return request('http://localhost:8000/mock/recentAnalysis')
}

export const getSuppliers = (inputValue: string) => {
  return request(`http://localhost:8000/api/suppliers/search?q=${encodeURIComponent(inputValue)}`)
}

export const getWsUrl = () => {
  return request('/mock/initWebsocketUrl')
}
