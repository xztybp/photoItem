import Vue from 'vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  install: function (Vue) {
    Vue.prototype.$login = function () {
      let userInfo = store.state.userInfo
      if (!userInfo) {
        Toast.fail('你未登录,请先登录')
        setTimeout(() => {
          router.push({
            path: '/login/login',
            query: { value: this.value }
          })
        }, 1000)
        return false
      } else {
        return true
      }
    }
  }
}
