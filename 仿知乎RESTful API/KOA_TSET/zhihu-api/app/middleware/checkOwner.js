
module.exports = async (ctx, next) => {
  //授权中间件
  if (ctx.params.id !== ctx.state.user._id) {
    ctx.throw(403, "没有权限")
  }
  await next();

}