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
// 对文章点赞
function apieaseLike (axios, id) {
  return axios({
    url: 'article/likings',
    method: 'post',
    data: {
      target: id
    }
  })
}
// 对文章取消点赞
function deleteApieaseLike (axios, id) {
  return axios({
    url: `article/likings/${id}`,
    method: 'DELETE'
  })
}
// 收藏文章
function collectionsApi (axios, id) {
  return axios({
    url: 'article/collections',
    method: 'post',
    data: {
      target: id
    }
  })
}
// 取消收藏文章
function deleteCollectionsApi (axios, id) {
  return axios({
    url: `article/collections/${id}`,
    method: 'DELETE'
  })
}
// 获取文章详情
function getarticleDetailsList (axios, id) {
  return axios({
    url: `articles/${id}`,
    method: 'get'
  })
}
// 获取评论信息
function getCommentsList (axios, type, source, offset = undefined) {
  return axios({
    url: `comments`,
    method: 'get',
    params: {
      type: type,
      source: source,
      offset: offset
    }
  })
}
// 发表评论方法
function addComments (axios, { target, content, artid = undefined }) {
  return axios({
    url: `comments`,
    method: 'post',
    data: {
      target,
      content,
      art_id: artid
    }
  })
}
// 关注用户
function Followed (axios, target) {
  return axios({
    url: `user/followings`,
    method: 'post',
    data: {
      target: target
    }
  })
}
// 取消关注用户
function deleteFollowed (axios, target) {
  return axios({
    url: `user/followings/${target}`,
    method: 'DELETE'
  })
}
// 暴露给外界：按需导出
export {
  userLogin, layoutNavList, articleList, allChannel,
  bulkEditingChannel, getThinkList, getArticleSearchList,
  getarticleDetailsList, getCommentsList, addComments,
  Followed, deleteFollowed, deleteApieaseLike, apieaseLike, collectionsApi, deleteCollectionsApi
}
