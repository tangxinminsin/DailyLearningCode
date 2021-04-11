const Comment = require('../models/comments')
module.exports = async (ctx, next) => {
  console.log(ctx.params)
  console.log(ctx.state)
  const comment = await Comment.findById(ctx.params.id).select('+commentator +questionId +answerId')
  if (!comment) {
    ctx.throw(404, "评论不存在")
  }
  if (ctx.params.questionId && comment.questionId != ctx.params.questionId) {
    ctx.throw(404, "该问题下没有此评论")
  }
  if (ctx.params.answerId && comment.answerId != ctx.params.answerId) {
    ctx.throw(404, "该回答下没有此评论")
  }
  ctx.state.comment = comment
  await next()
}