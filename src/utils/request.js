import axios from 'axios'
// 导入store 拿到Vuex里面的数据
import Store from '@/store/index.js'
import JSONbigint from 'json-bigint'
// 自定义配置创建axios的新实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/'
})
// 创建一个发送失效后token的实例
const refreshTtokenInstance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/'
})
const instance1 = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_1/'
})
// Add a request interceptor 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // Do something before request is sent 发送请求前需要处理的逻辑代码
  if (Store.state.userInfo) {
    config.headers.Authorization = `Bearer ${Store.state.userInfo.token}`
  }
  return config
}, function (error) {
  // Do something with request error 处理请求错误
  return Promise.reject(error)
})

// Add a response interceptor 添加响应拦截器
instance.interceptors.response.use(function (response) {
  return response.data.data
}, async function (error) {
  console.dir(error)
  if (error.response.status === 401) {
    console.log('token失效了')
    let userInfo = Store.state.userInfo
    let res = await refreshTtokenInstance({
      url: 'v1_0/authorizations',
      method: 'put',
      headers: {
        Authorization: `Bearer ${userInfo.refresh_token}`
      }
    })
    userInfo.token = res.data.data.token // 得到新的token
    Store.commit('setUser', userInfo) // 重新修改Store 里面的值
    console.log('aaaaa')
    // 刷新token
    return instance(error.config)
  }
  return Promise.reject(error)
})
instance1.interceptors.request.use(function (config) {
  // Do something before request is sent 发送请求前需要处理的逻辑代码
  if (Store.state.userInfo) {
    config.headers.common['Authorization'] = `Bearer ${Store.state.userInfo.token}`
  }
  return config
}, function (error) {
  // Do something with request error 处理请求错误
  return Promise.reject(error)
})
// 改变响应数据:由于在js中数值类型可识别位数有限制,所以需要JSONbigint 插件进行转换
instance.defaults.transformResponse = [(data) => {
  try {
    return JSONbigint.parse(data)
  } catch (err) {
    console.log(err)
    return data
  }
}]
// Add a response interceptor 添加响应拦截器
instance1.interceptors.response.use(function (response) {
  return response.data.data
}, function (error) {
  console.log(error)
  return Promise.reject(error)
})

// 所谓vue插件其实就是一个简单的js对象而已，然后这个插件对象有一个公开属性 install ,
// 它的值为一个函数，此函数接受两个参数。第一个参数是 Vue 构造器 , 第二个参数是一个可选的选项对象。
// 只要在.js里规定了install方法，就可以向其他ui组件库那样，使用Vue.use()来全局使用
// 所谓vue的插件，就是一个js对象
let Plugin = {
  // 添加属性或方法
  // 这里我写的$http加了$符号的，表示它为vue全局的，但实际上不加也可以的，访问时也不加就行了
  install: function (Vue) {
    Vue.prototype.$http = instance
    Vue.prototype.$http1 = instance1
  }
}
export default Plugin
