const Comment = require('../models/comments')

class TopicsCtl {
  // 查询评论
  async find(ctx) {
    //分页 limit:查询多少条 skip：跳过前面的多少条
    const { pageSize = 10, current = 1, q = '', rootCommentId } = ctx.query
    //防止分页参数小于1
    const newPageSize = Math.max(pageSize * 1, 1)
    const newCurrent = Math.max(current * 1, 1) - 1
    const keyword = new RegExp(q)
    const { questionId, answerId } = ctx.params
    const comment = await Comment
      .find({ content: keyword, questionId, answerId, rootCommentId })
      .limit(newPageSize)
      .skip(newCurrent * newPageSize)
      .populate('commentator replayTo')
    ctx.body = comment
  }
  // 根据ID查询特定评论
  async findById(ctx) {
    const { fields = '' } = ctx.query
    const selectFields = fields.split(";").filter(f => f).map(f => ' +' + f).join('')
    const comment = await Comment.findById(ctx.params.id).select(selectFields).populate('commentator')
    if (!comment) {
      ctx.throw(404, "评论不存在！")
    }
    ctx.body = comment
  }
  // 创建评论
  async create(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: true },
      rootCommentId: { type: 'string', required: false },
      replayTo: { type: 'string', required: false },
    })
    const commentator = ctx.state.user._id
    const { questionId, answerId } = ctx.params
    const comment = await new Comment({ ...ctx.request.body, commentator, questionId, answerId }).save()
    ctx.body = comment
  }
  // 更新评论
  async update(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: false },
    })
    const { content } = ctx.request.body
    await ctx.state.comment.update(content)
    ctx.body = {
      updataed: ctx.request.body//更新后
    }
  }
  // 删除评论
  async delete(ctx) {
    const comment = await Comment.findByIdAndDelete(ctx.params.id)
    if (!comment) {
      ctx.throw(404, "评论不存在！")
    }
    ctx.body = {
      message: "删除成功",
    }
  }

}

module.exports = new TopicsCtl;