import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@views/login/login.vue'
import Home from '@views/Home/home.vue'
import Layout from '@views/Home/routers/layout.vue'
import Layout1 from '@views/Home/routers/layout1.vue'
Vue.use(VueRouter)
/* console.log(VueRouter) */
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      { path: '/', name: 'Layout', component: Layout },
      { path: 'layout1', name: 'Layout1', component: Layout1 }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
