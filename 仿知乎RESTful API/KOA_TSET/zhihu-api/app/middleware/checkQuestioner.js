// 判断用户是否为问题的发起人
module.exports = async (ctx, next) => {
  const { question } = ctx.state
  if (question.questioner.toString() !== ctx.state.user._id) {
    ctx.throw(403, "没有权限")
  }
  await next()
}