
module.exports = async (ctx, next) => {
  const { comment } = ctx.state
  if (comment.commentator.toString() != ctx.state.user._id) {
    ctx.throw(403, "没有权限")
  }
  await next()
}