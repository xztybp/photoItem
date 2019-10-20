import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import $http from '@/utils/request.js'
import 'vant/lib/index.css'
import '@/icons/iconfont.css'
Vue.use(Vant)
Vue.use($http)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
