/* 添加search方法 */
function addSearchApi (search) {
  window.localStorage.setItem('search', search)
}
/* 查找search方法 */
function getSearchApi () {
  return window.localStorage.getItem('search')
}
/* 删除search结果 */
function removeSearchApi (params) {
  window.localStorage.removeItem('search')
}
export { addSearchApi, getSearchApi, removeSearchApi }
