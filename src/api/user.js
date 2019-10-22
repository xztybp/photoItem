function userLogin (axios, { url, method, data }) {
  return axios({
    url,
    method,
    data
  })
}
function layoutNavList (axios, { url, method }) {
  return axios({
    url,
    method
  })
}
// 暴露给外界：按需导出
export { userLogin, layoutNavList }
