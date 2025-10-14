import type { RequestConfig } from 'umi'

export const request: RequestConfig = {
  timeout: 3000,
  errorConfig: {},
  requestInterceptors: [
    (url, options) => ({
      url,
      options: {
        ...options,
        ...{ params: { ...options.params, lang: localStorage.getItem('umi_locale') || undefined } },
      },
    }),
  ],
  responseInterceptors: [(response) => response],
}

// 在开发环境中启动 mock worker
if (process.env.NODE_ENV === 'development') {
  import('../mockWebsocket/index').then(({ worker }) => {
    worker.start({
      quiet: true, // 设置为 false 查看详细日志
    })
  })
}

// if (process.env.NODE_ENV === 'development') {
//   import('../mockWebsocket/websocket').then(({ worker }) => {
//     worker.start({
//       quiet: true,
//     })
//   })
// }
