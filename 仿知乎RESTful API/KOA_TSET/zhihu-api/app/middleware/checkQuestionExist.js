const Question = require('../models/questions')
module.exports = async (ctx, next) => {
  const question = await Question.findById(ctx.params.id).select('+questioner')
  if (!question) {
    ctx.throw(404, "问题不存在")
  }
  ctx.state.question = question
  await next()
}