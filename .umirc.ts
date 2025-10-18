import { defineConfig } from 'umi'

export default defineConfig({
  title: '采购智能风控智能体',
  plugins: ['@umijs/plugins/dist/request'],
  request: {},
  mock: {},
  devtool: process.env.NODE_ENV === 'development' ? 'eval-cheap-module-source-map' : false,

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
    '/kapi': {
      target: 'https://feature.kingdee.com:1026/feature_sit_scm/kapi/',
      // target: 'http://172.20.113.95:8080/ierp/kapi/',
      changeOrigin: true,
      pathRewrite: { '^/kapi': '' },
    },
  },
  jsMinifier: 'esbuild',
  jsMinifierOptions: {
    minify: true,
  },
  esbuildMinifyIIFE: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
})
