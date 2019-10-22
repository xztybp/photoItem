import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import MyPlugin from '@/utils/request.js'
import 'vant/lib/index.css'
import '@/icons/iconfont.css'
Vue.use(Vant)
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
