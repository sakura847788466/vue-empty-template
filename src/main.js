/*
 * @Descripttion: This is one of the pages for object
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-12-30 11:01:10
 * @LastEditors: Ada
 * @LastEditTime: 2021-12-31 09:43:04
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/common.scss'
import '@/utils/flexible'
import '@/utils/element'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
