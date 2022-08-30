import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// import Vue from 'vue'
// import VueRouter, { RouteConfig } from 'vue-router'

// Vue.use(VueRouter)
// export const constantRoutes: RouteConfig[] = [
//   {
//     path: '/login',
//     component: () => import('@/views/login/index.vue'),
//     meta: { hidden: true }
//   }
// ]

// const createRouter = () => new VueRouter({
//   scrollBehavior: (to, from, savedPosition) => {
//     if (savedPosition) {
//       return savedPosition
//     } else {
//       return { x: 0, y: 0 }
//     }
//   },
//   base: process.env.BASE_URL,
//   routes: constantRoutes
// })

// const router = createRouter()

// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// // export function resetRouter() {
// //   const newRouter = createRouter();
// //   (router as any).matcher = (newRouter as any).matcher // reset router
// // }

// export default router
