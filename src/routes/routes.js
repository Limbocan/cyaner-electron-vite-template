import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: { name: 'Index' },
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/home/Home.vue'),
        meta: { title: '首页' }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition
  }
})

// router.beforeEach((to, from) => {
// })

export default router
