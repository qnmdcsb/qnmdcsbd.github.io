// token封装
// 存token数据到localStorage
export function setToken (tokenkey, token) {
  return localStorage.setItem(tokenkey, token)
}
// 获取被存入的tokenkey值
export function getToken (tokenkey) {
  return localStorage.getItem(tokenkey)
}
// 删除tokenkey的值
export function removeToken (tokenkey) {
  return localStorage.removeItem(tokenkey)
}
