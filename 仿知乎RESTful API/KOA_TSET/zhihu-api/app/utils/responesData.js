// 返回数据
module.exports = (value, token, message) => {
  return {
    token,
    data: value,
    message: message,
    ok: true
  }
}