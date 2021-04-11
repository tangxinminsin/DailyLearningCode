const Answers = require('../models/answers')

class TopicsCtl {
  // 查询回答
  async find(ctx) {
    //分页 limit:查询多少条 skip：跳过前面的多少条
    const { pageSize = 10, current = 1, q = '' } = ctx.query
    //防止分页参数小于1
    const newPageSize = Math.max(pageSize * 1, 1)
    const newCurrent = Math.max(current * 1, 1) - 1
    const keyword = new RegExp(q)
    const answer = await Answers
      .find({ content: keyword, questionId: ctx.params.questionId })//模糊搜索
      .limit(newPageSize)
      .skip(newCurrent * newPageSize)
    ctx.body = answer
  }
  // 根据ID查询特定回答
  async findById(ctx) {
    const { fields = '' } = ctx.query
    const selectFields = fields.split(";").filter(f => f).map(f => ' +' + f).join('')
    const answer = await Answers.findById(ctx.params.id).select(selectFields).populate('questionId  answerer')
    if (!answer) {
      ctx.throw(404, "回答不存在！")
    }
    ctx.body = answer
  }
  // 创建回答
  async create(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: true },
    })
    const answerer = ctx.state.user._id
    const questionId = ctx.params.questionId
    const answer = await new Answers({ ...ctx.request.body, answerer, questionId }).save()
    ctx.body = answer
  }
  // 更新回答
  async update(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: false },
    })
    await ctx.state.answer.update(ctx.request.body)
    ctx.body = {
      updataed: ctx.request.body//更新后
    }
  }
  // 删除回答
  async delete(ctx) {
    const answer = await Answers.findByIdAndDelete(ctx.params.id)
    if (!answer) {
      ctx.throw(404, "回答不存在！")
    }
    ctx.body = {
      message: "删除成功",
    }
  }

}

module.exports = new TopicsCtl;