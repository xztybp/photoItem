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
// 加载首页用户文章列表
function articleList (axios, { url, method, params }) {
  return axios({
    url,
    method,
    params
  })
}
// 获取全部文章频道列表
function allChannel (axios, { url, method }) {
  return axios({
    url,
    method
  })
}
// 批量修改用户频道列表（重置式）
function bulkEditingChannel (axios, { url, method, data }) {
  return axios({
    url,
    method,
    data
  })
}
// 获取联想列表
function getThinkList (axios, { url, method }) {
  return axios({
    url,
    method
  })
}
// 获取文章搜索结果
function getArticleSearchList (axios, page, q) {
  return axios({
    url: 'search',
    method: 'GET',
    params: {
      page: page,
      q: q
    }
  })
}
// 暴露给外界：按需导出
export { userLogin, layoutNavList, articleList, allChannel, bulkEditingChannel, getThinkList, getArticleSearchList }
