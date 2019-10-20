function userLogin (axios, { url, method, data }) {
  return axios({
    url,
    method,
    data
  })
}
// 暴露给外界：按需导出
export { userLogin }
