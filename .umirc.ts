import { defineConfig } from 'umi'

export default defineConfig({
  title: 'demo-cui',
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
})
