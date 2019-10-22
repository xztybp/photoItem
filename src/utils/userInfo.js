// 编辑方法

// 将操作 localstorage 的方法封装到一个文件中
// 添加
function setUserLocal (value) {
  window.localStorage.setItem('userInfo', JSON.stringify(value))
}
// 查询
function getUserLocal () {
  return JSON.parse(window.localStorage.getItem('userInfo'))
}
// 修改&删除
function removeUserLocal () {
  window.localStorage.removeItem('userInfo')
}
export { setUserLocal, getUserLocal, removeUserLocal }
