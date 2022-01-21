import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/table'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "introduce" */ '../views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "introduce" */ '../views/Login.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import(/* webpackChunkName: "introduce" */ '../views/Table.vue')
    },
    // {
    //   path: '/category',
    //   name: 'category',
    //   component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue'),
    //   children: [
    //     {
    //       path: '/category/level2',
    //       name: 'level2',
    //       component: () => import(/* webpackChunkName: "level2" */ '../views/Category.vue'),
    //     },
    //     {
    //       path: '/category/level3',
    //       name: 'level3',
    //       component: () => import(/* webpackChunkName: "level3" */ '../views/Category.vue'),
    //     }
    //   ]
    // }
  ]
})

export default router