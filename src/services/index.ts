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

export const getHistory = () => {
  return request('/mock/history')
}

export const getToken = () => {
  const data = {
    client_id: 'nyk_test',
    client_secret: 'Xy8@zB#5dF*gH2jK$mN7qR9tS!vW3yZ',
    username: 'IERP',
    accountId: '1356502410930947072',
    nonce: '0237e588-240c-4e75-b5fd-d7be602468ea',
    timestamp: '2025-10-17 15:42:52',
    language: 'zh_CN',
  }

  return request('/api/feature_sit_scm/kapi/oauth2/getToken', { method: 'post', data })
}

export const getTestData = (data) => {
  return request('/v2/gai/assistants', { method: 'post', headers: data })
}
