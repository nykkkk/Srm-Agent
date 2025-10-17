import { defineConfig } from 'umi'

export default defineConfig({
  title: '采购智能风控智能体',
  plugins: ['@umijs/plugins/dist/request'],
  request: {},
  mock: {},
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: '@/pages/index',
          routes: [
            { path: '/', redirect: '/chat' },
            // { path: '/home', component: '@/pages/homepage/index' },
            { path: '/chat', component: '@/pages/chat/index' },
          ],
        },
      ],
    },
  ],
  history: {
    type: 'hash',
  },
  fastRefresh: true,
  hash: true,
  npmClient: 'yarn',
  proxy: {
    '/api': {
      target: 'https://feature.kingdee.com:1026',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/v2': {
      target: 'https://feature.kingdee.com:1026/feature_sit_scm/kapi/v2',
      changeOrigin: true,
      pathRewrite: { '^/v2': '' },
    },
  },
})
