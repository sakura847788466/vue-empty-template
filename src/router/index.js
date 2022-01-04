/*
 * @Descripttion: 系统路由入口文件
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-12-30 11:35:02
 * @LastEditors: Ada
 * @LastEditTime: 2021-12-30 13:45:36
 */
import Vue from 'vue';
import Router from 'vue-router';
// import { getStore } from '@/utils/localStore'
// import Store from '@/store/index'
import { constantRouterMap,asyncRouterMap} from './allPageRoute'
// import {filterAsyncRouter} from './routerPermission'

Vue.use (Router);


const router = new Router ({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [...constantRouterMap, ...asyncRouterMap]
});


// 路由守卫
// router.beforeEach ((to, from, next) => {
//   if (getStore({ name: 'token' })) {
//     if (to.path === '/login') {
//       // 如果登录成功访问登录页跳转到主页
//       next({ path: '/' })
//     } else {
//       if (Store.state.user.userInfo) {
//         Store.dispatch('Form')
//         const roleId = Number(Store.state.user.userInfo.roleId)
//         const newRoute = filterAsyncRouter(asyncRouterMap,roleId)
//         Store.commit('SET_TOP_MENU', newRoute[0].children)
//       }
//       next()
//     }
//   } else {
//     // 没有登录
//     if (to.path !== '/login') {
//       next({ path: '/login' }) // 跳转到登录页
//     } else {
//       next()
//     }
//   }
// });
export default router;
