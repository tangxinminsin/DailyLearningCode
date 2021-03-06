const Questions = require('../models/questions')
const Topics = require('../models/topics')
const responesData = require('../utils/responesData')
class TopicsCtl {
  // 查询问题
  async find(ctx) {
    //分页 limit:查询多少条 skip：跳过前面的多少条
    const { pageSize = 10, current = 1, q = '' } = ctx.query
    //防止分页参数小于1
    const newPageSize = Math.max(pageSize * 1, 1)
    const newCurrent = Math.max(current * 1, 1) - 1
    const keyword = new RegExp(q)
    const total = await Questions.find({ $or: [{ title: keyword }, { description: keyword }] }).count()
    const question = await Questions
      .find({ $or: [{ title: keyword }, { description: keyword }] })//模糊搜索
      .limit(newPageSize)
      .sort({ updatedAt: -1 })
      .skip(newCurrent * newPageSize)
    ctx.body = {
      ok: true,
      data: {
        data: question,
        pageSize: pageSize,
        current: current,
        total: total
      },

    }
  }
  // 根据ID查询特定问题
  async findById(ctx) {
    const { fields = '' } = ctx.query
    const selectFields = fields.split(";").filter(f => f).map(f => ' +' + f).join('')
    const question = await Questions.findById(ctx.params.id).select(selectFields).populate('questioner topics')

    if (!question) {
      ctx.throw(404, "问题不存在！")
    }
    ctx.body = responesData(question)
  }
  async getTopicsName(ctx) {
    const nameList = []
    const topicsId = ctx.request.body.topicsId
    topicsId && topicsId.map(async (id) => {
      const name = await Topics.find({ id })
      await nameList.push(name)
    })

  }
  // 创建问题
  async create(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      description: { type: 'string', required: false },
      topics: { type: 'array', required: false },
    })

    const question = await Questions({
      ...ctx.request.body,
      questioner: ctx.state.user._id,
      questionName: ctx.state.user.username
    }).save()

    ctx.body = responesData(question)
  }
  // 更新问题
  async update(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: false },
      description: { type: 'string', required: false },
    })
    await ctx.state.question.update(ctx.request.body)
    ctx.body = {
      updataed: ctx.request.body//更新后
    }
  }
  // 删除问题
  async delete(ctx) {
    const question = await Questions.findByIdAndDelete(ctx.params.id)
    if (!question) {
      ctx.throw(404, "问题不存在！")
    }
    ctx.status = 204
    ctx.body = {
      message: "删除成功",
      status: 204
    }
  }

}

module.exports = new TopicsCtl;