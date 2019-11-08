import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import MyPlugin from '@/utils/request.js'
import 'vant/lib/index.css'
import '@/icons/iconfont.css'
import filters from '@/filters/filters.js'
import $Login from '@/utils/loginPlug.js'
Vue.use(Vant)
Vue.use(Lazyload)
Vue.use($Login)
/* 得到方法名数组 */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/* console.log(filters) */
/* console.log(MyPlugin.install)  */
// Vue.use(MyPlugin) 相当于调用 `MyPlugin.install(Vue)了方法`
// ƒ install(Vue) {
//    Vue.prototype.$http = instance;
//  }
Vue.use(MyPlugin)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
