// 用户登录方法
function userLogin (axios, { url, method, data }) {
  return axios({
    url,
    method,
    data
  })
}
// 加载首页文章导航条标题
function layoutNavList (axios, { url, method }) {
  return axios({
    url,
    method
  })
}
// 加载首页文章列表
function articleList (axios, { url, method, params }) {
  return axios({
    url,
    method,
    params
  })
}
// 暴露给外界：按需导出
export { userLogin, layoutNavList, articleList }
