
module.exports = async (ctx, next) => {
  const { answer } = ctx.state
  if (answer.answerer.toString() != ctx.state.user._id) {
    ctx.throw(403, "没有权限")
  }
  await next()
}