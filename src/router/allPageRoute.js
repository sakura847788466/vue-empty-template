/*
 * @Descripttion: 页面全部路由定义
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-12-30 11:24:03
 * @LastEditors: Ada
 * @LastEditTime: 2021-12-30 14:03:40
 */
import Layout from '@/layout/index'
export const constantRouterMap = [{
    path: '/',
    name: 'Login',
    component: () => import ('@/page/Login/Login.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import ('@/page/Login/Login.vue'),
  },{
    path: '/404',
    name: '404',
    component: () => import ('@/page/404/404.vue'),
  },{
    path:'/main',
    name:'main',
    redirect: '/system/user'
  }]


export const asyncRouterMap = [{
    path: '/system/user',
    name: 'system',
    component: Layout,
    children:[{
      path: '/system/user',
      name: 'user',
      component: () => import ('@/views/System/User/User.vue'),
    }]
}]
