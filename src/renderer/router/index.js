import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index.vue'
// 引入路由表
import asyncRouterMap from './asyncRouterMap'

Vue.use(Router)

export const staticRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: '/home',
        name: '主页',
        component: () => import('@/views/index/index'),
        hidden: true
      }
    ]
  },

  {
    path: '*',
    component: () => import('@/views/404'),
    hidden: true
  }]
export const asyncRoutes = asyncRouterMap

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: staticRouterMap
})
const router = createRouter()

export default router
