const Topic = require('../models/topics')
module.exports = async (ctx, next) => {
  const topic = await Topic.findById(ctx.params.id)
  if (!topic) {
    ctx.throw(404, "话题不存在")
  }
  await next()
}