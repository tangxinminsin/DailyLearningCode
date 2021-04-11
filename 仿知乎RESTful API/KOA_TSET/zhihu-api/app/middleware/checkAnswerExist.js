const Answer = require('../models/answers')
module.exports = async (ctx, next) => {
  const answer = await Answer.findById(ctx.params.id).select('+answerer')
  if (!answer) {
    ctx.throw(404, "回答不存在")
  }
  if (answer.questionId && answer.questionId != ctx.params.questionId) {
    ctx.throw(404, "该问题下没有此答案")
  }
  ctx.state.answer = answer
  await next()
}