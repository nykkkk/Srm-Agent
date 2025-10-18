import { request } from 'umi'

const isKingdee = window.location.href.includes('/kingdee')
const front = isKingdee ? window.location.href.split('/kingdee')[0] : ''
export const getMockData = () => {
  return request('http://localhost:8000/mock/data')
}

export const getWsUrl = () => {
  return request('/mock/initWebsocketUrl')
}

export const getHistory = () => {
  return request('/mock/history')
}

export const getRecentAnalysis = (headers, data) => {
  return request(front + '/kapi/v2/pbd/riskagent/history_analyzes', { method: 'post', headers: headers, data: data })
}

export const getSuppliers = (headers, data) => {
  return request(front + `/kapi/v2/pbd/riskagent/supplier_search`, {
    method: 'post',
    headers: headers,
    data: data,
  })
}

export const getToken = () => {
  function getCurrentTimeAndRandomString() {
    // 获取当前时间
    const currentTime = new Date().toISOString()

    // 生成30位随机字符串（数字和字母组成）
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let randomString = ''

    for (let i = 0; i < 30; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      randomString += characters[randomIndex]
    }

    return {
      timestamp: currentTime,
      randomString: randomString,
    }
  }

  // 使用示例
  const result = getCurrentTimeAndRandomString()
  // const data = {
  //   client_id: 'nyk_test',
  //   client_secret: 'Xy8@zB#5dF*gH2jK$mN7qR9tS!vW3yZ',
  //   username: 'IERP',
  //   accountId: '1356502410930947072',
  //   nonce: result.randomString, // 替换为随机字符串
  //   timestamp: result.timestamp, // 替换为当前时间
  //   language: 'zh_CN',
  // }
  const data = {
    client_id: 'RiskAgent',
    client_secret: 'figd_5ejJs3OM!sO4JERt6VM#AnyJDhYcAGZNuAQjs4rqm5',
    username: 'IERP',
    accountId: '1356502410930947072',
    nonce: result.randomString,
    timestamp: result.timestamp,
    language: 'zh_CN',
  }

  return request(front + '/kapi/oauth2/getToken', { method: 'post', data })
}

export const getInitStore = (data) => {
  return request(front + '/kapi/v2/pbd/riskagent/init_store', { method: 'post', headers: data })
}

export const startAnalysis = (data) => {
  return request(front + '/kapi/v2/pbd/riskagent/analyze', { method: 'post', headers: data })
}
