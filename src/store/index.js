import Vue from 'vue'
import Vuex from 'vuex'
import { setUserLocal, getUserLocal } from '@/utils/userInfo.js'
import { addSearchApi, getSearchApi } from '@/utils/search.js'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: getUserLocal(),
    search: getSearchApi()
  },
  mutations: {
    // 修改统一资源库里的数据
    setUser (state, obj) {
      state.userInfo = obj
      setUserLocal(state.userInfo)
    },
    // 修改search结果
    setSearch (state, Str) {
      state.search = Str
      addSearchApi(state.search)
    }
  },
  actions: {
  },
  modules: {
  }
})
