const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')
const Question = require('../models/questions')
const Answer = require('../models/answers')
const { secret } = require('../config')
class UsersCtl {

  // 登录
  async login(ctx) {
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    // 判断用户名/密码是否正确
    const user = await User.findOne(ctx.request.body)
    if (!user) {
      ctx.throw(401, "用户名或密码不正确!")
    }
    const { _id, username } = user
    const token = jsonwebtoken.sign({ _id, username }, secret, { expiresIn: '1d' })//expiresIn有效期
    ctx.body = { token }
  }
  // 查询所有用户
  async find(ctx) {
    //分页 limit:查询多少条 skip：跳过前面的多少条
    const { pageSize = 10, current = 1, q = '' } = ctx.query
    //防止分页参数小于1
    const newPageSize = Math.max(pageSize * 1, 1)
    const newCurrent = Math.max(current * 1, 1) - 1
    const user = await User
      .find({ username: new RegExp(q) })//模糊搜索
      .limit(newPageSize)
      .skip(newCurrent * newPageSize)
    ctx.body = user
    // ctx.body = await User.find().select('+password') //查询时将密码也查询出来
  };
  // 根据ID查询用户
  async findById(ctx) {
    const { fields = '' } = ctx.query
    const selectFields = fields.split(";").filter(f => f).map(f => ' +' + f).join('')
    const populateStr = fields.split(";").filter(f => f).map(f => {
      if (f === "employments") {
        return 'employments.company employments.job'
      }
      return f
    }).join(' ')
    const user = await User.findById(ctx.params.id).select(selectFields).populate(populateStr)

    if (!user) {
      ctx.throw(404, "用户不存在！")
    }
    ctx.body = user
  };
  // 创建用户
  async create(ctx) {
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    // 判断用户名是否存在(唯一性校验)
    const { username } = ctx.request.body
    const repeatedUser = await User.findOne({ username })
    if (repeatedUser) {
      ctx.throw(409, "用户名已存在！")
    }
    const user = await new User(ctx.request.body).save()
    ctx.body = user
  };
  // 更新用户信息
  async update(ctx) {
    ctx.verifyParams({
      username: { type: 'string', required: false },
      password: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      gender: { type: 'string', required: false },
      headline: { type: 'string', required: false },
      locations: { type: 'array', itemType: 'string', required: false },//数组对象参数校验
      employments: { type: 'array', itemType: 'object', required: false }//数组对象参数校验
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) {
      ctx.throw(404, "用户不存在！")
    }
    ctx.body = user
  };
  // 删除用户
  async detele(ctx) {
    const user = await User.findByIdAndDelete(ctx.params.id)
    if (!user) {
      ctx.throw(404, "用户不存在！")
    }
    ctx.body = {
      message: "删除成功"
    }
  };
  // 关注某人
  async follow(ctx) {
    //获取关注列表
    const myFollowList = await User.findById(ctx.state.user._id).select('+following')
    if (!myFollowList.following.map(id => id.toString()).includes(ctx.params.id)) {
      myFollowList.following.push(ctx.params.id)
      myFollowList.save()
    }
    ctx.status = 204
  }
  // 取消关注某人
  async unFollow(ctx) {
    //获取关注列表
    const myFollowList = await User.findById(ctx.state.user._id).select('+following')
    // 获取要取消关注人的id在列表中的索引
    const index = await myFollowList.following.map(id => id.toString()).indexOf(ctx.params.id)
    if (index > -1) {
      myFollowList.following.splice(index, 1)
      myFollowList.save()
    }
    ctx.status = 204
  }
  // 某个用户关注的列表
  async listFollowing(ctx) {
    const user = await User.findById(ctx.params.id).select('+following').populate('following')
    if (!user) {
      ctx.throw(404, "用户不存在")
    }
    ctx.body = user.following
  }
  // 某个用户的粉丝列表
  async listFollowers(ctx) {
    const users = await User.find({ following: ctx.params.id });
    ctx.body = users
  }
  // 关注话题
  async followTopic(ctx) {
    //获取用户关注话题列表
    const myFollowList = await User.findById(ctx.state.user._id).select('+followingTopics')
    if (!myFollowList.followingTopics.map(id => id.toString()).includes(ctx.params.id)) {
      myFollowList.followingTopics.push(ctx.params.id)
      myFollowList.save()
    }
    ctx.status = 204
  }
  // 取消关注话题
  async unFollowTopic(ctx) {
    //获取用户关注话题列表
    const myFollowList = await User.findById(ctx.state.user._id).select('+followingTopics')
    // 获取要取消关注人的id在列表中的索引
    const index = await myFollowList.followingTopics.map(id => id.toString()).indexOf(ctx.params.id)
    if (index > -1) {
      myFollowList.followingTopics.splice(index, 1)
      myFollowList.save()
    }
    ctx.status = 204
  }
  // 某个用户关注的话题列表
  async listFollowingTopic(ctx) {
    const user = await User.findById(ctx.params.id).select('+followingTopics').populate('followingTopics')
    if (!user) {
      ctx.throw(404, "用户不存在")
    }
    ctx.body = user.followingTopics
  }
  // 用户提问列表
  async listQuestion(ctx) {
    const question = await Question.find({ questioner: ctx.params.id })
    ctx.body = question
  }
  // 赞回答
  async likingAnsers(ctx, next) {
    //获取用户赞回答列表
    const myLikingList = await User.findById(ctx.state.user._id).select('+likingAnswer')
    if (!myLikingList.likingAnswer.map(id => id.toString()).includes(ctx.params.id)) {
      myLikingList.likingAnswer.push(ctx.params.id)
      myLikingList.save()
      await Answer.findByIdAndUpdate(ctx.params.id, { $inc: { voteCount: 1 } })
    }
    ctx.status = 204
    await next()
  }

  // 取消赞
  async unlikingAnsers(ctx) {
    //获取用户赞回答列表
    const myLikingList = await User.findById(ctx.state.user._id).select('+likingAnswer')
    // 获取要取消关注人的id在列表中的索引
    const index = await myLikingList.likingAnswer.map(id => id.toString()).indexOf(ctx.params.id)
    if (index > -1) {
      myLikingList.likingAnswer.splice(index, 1)
      myLikingList.save()
      await Answer.findByIdAndUpdate(ctx.params.id, { $inc: { voteCount: -1 } })
    }
    ctx.status = 204
  }
  // 某个用户关注的赞回答列表
  async listLikingAnswer(ctx) {
    const user = await User.findById(ctx.params.id).select('+likingAnswer').populate('likingAnswer')
    if (!user) {
      ctx.throw(404, "用户不存在")
    }
    ctx.body = user.likingAnswer
  }
  // 踩回答
  async DislikingAnsers(ctx, next) {
    //获取用户踩回答列表
    const myDisLikingList = await User.findById(ctx.state.user._id).select('+dislikingAnswer')
    if (!myDisLikingList.dislikingAnswer.map(id => id.toString()).includes(ctx.params.id)) {
      myDisLikingList.dislikingAnswer.push(ctx.params.id)
      myDisLikingList.save()
    }
    ctx.status = 204
    await next()
  }

  // 取消踩
  async unDislikingAnsers(ctx) {
    //获取用户踩回答列表
    const myDisLikingList = await User.findById(ctx.state.user._id).select('+dislikingAnswer')
    // 获取要取消关注人的id在列表中的索引
    const index = await myDisLikingList.dislikingAnswer.map(id => id.toString()).indexOf(ctx.params.id)
    if (index > -1) {
      myDisLikingList.dislikingAnswer.splice(index, 1)
      myDisLikingList.save()
    }
    ctx.status = 204
  }
  // 某个用户关注的踩回答列表
  async listDisLikingAnswer(ctx) {
    const user = await User.findById(ctx.params.id).select('+dislikingAnswer').populate('dislikingAnswer')
    if (!user) {
      ctx.throw(404, "用户不存在")
    }
    ctx.body = user.dislikingAnswer
  }

}

module.exports = new UsersCtl;