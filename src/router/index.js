import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@views/login/login.vue'
import Home from '@views/Home/home.vue'
import Layout from '@views/Home/routers/layout.vue'
import Layout1 from '@views/Home/routers/layout1.vue'
import Layout2 from '@views/Home/routers/layout2.vue'
import Layout3 from '@views/Home/routers/layout3.vue'
Vue.use(VueRouter)
/* console.log(VueRouter) */
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/login/login', name: 'Login', component: Login },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      { path: '/', name: 'Layout', component: Layout },
      { path: 'layout1', name: 'Layout1', component: Layout1 },
      { path: 'layout2', name: 'Layout2', component: Layout2 },
      { path: 'layout3', name: 'Layout3', component: Layout3 }
    ]
  },
  { path: '/search', name: 'search', component: () => import('@views/search/search.vue') },
  { path: '/articleDetails', name: 'articleDetails', component: () => import('@views/articleDetails/articleDetails.vue') }
]

const router = new VueRouter({
  routes
})

export default router
