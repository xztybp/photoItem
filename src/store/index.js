import Vue from 'vue'
import Vuex from 'vuex'
import { setUserLocal, getUserLocal } from '@/utils/userInfo.js'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: getUserLocal()
  },
  mutations: {
    // 修改统一资源库里的数据
    setUser (state, obj) {
      state.userInfo = obj
      setUserLocal(state.userInfo)
    }
  },
  actions: {
  },
  modules: {
  }
})
