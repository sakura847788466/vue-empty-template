/*
 * @Descripttion: This is one of the pages for object
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-11-12 10:44:38
 * @LastEditors: Ada
 * @LastEditTime: 2021-12-30 13:33:44
 */
import {setStore, getStore} from '@/utils/localStore';
const user = {
  state: {
    token: getStore ({
      name: 'token',
    }) || '',
  },
  actions: {
  
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setStore({
        name: 'token',
        content: state.token,
        type: 'session'
      })
    }
  },
};
export default user;
