const Topics = require('../models/topics')
const User = require('../models/users')
const Question = require('../models/questions')

class TopicsCtl {
  // 查询话题
  async find(ctx) {
    //分页 limit:查询多少条 skip：跳过前面的多少条
    const { pageSize = 10, current = 1, q = '' } = ctx.query
    //防止分页参数小于1
    const newPageSize = Math.max(pageSize * 1, 1)
    const newCurrent = Math.max(current * 1, 1) - 1
    const topics = await Topics
      .find({ name: new RegExp(q) })//模糊搜索
      .limit(newPageSize)
      .skip(newCurrent * newPageSize)
    ctx.body = topics
  }
  // 根据ID查询特定话题
  async findById(ctx) {
    const { fields = '' } = ctx.query
    const selectFields = fields.split(";").filter(f => f).map(f => ' +' + f).join('')
    const topic = await Topics.findById(ctx.params.id).select(selectFields)

    if (!topic) {
      ctx.throw(404, "话题不存在！")
    }
    ctx.body = topic
  }
  // 创建话题
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
    })
    const topic = await new Topics(ctx.request.body).save()
    ctx.body = topic
  }
  // 更新话题
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
    })
    const topic = await Topics.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    ctx.body = {
      preUpdata: topic,//更新前
      updataed: ctx.request.body//更新后
    }
  }
  //获取话题的粉丝列表
  async listTopicFollowers(ctx) {
    const users = await User.find({ followingTopics: ctx.params.id });
    ctx.body = users
  }
  // 获取话题下的问题
  async listTopicQuestions(ctx) {
    const question = await Question.find({ topics: ctx.params.id })
    ctx.body = question
  }
}

module.exports = new TopicsCtl;