const mongoose = require('mongoose')

const { Schema, model } = mongoose

const usersModel = new Schema({
  __v: { type: Number, select: false },//查询时隐藏__v字段
  username: { type: String, required: true },//用户名
  name: { type: String, require: false },
  password: { type: String, required: true, select: false },
  avatar_url: { type: String },
  gender: { type: String, enum: ['male', 'female'], default: 'male', required: false },//男女枚举
  headline: { type: String },
  locations: { type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }], select: false },
  employments: {//职业——数组对象
    type: [{
      company: { type: Schema.Types.ObjectId, ref: 'Topic' },
      job: { type: Schema.Types.ObjectId, ref: 'Topic' }
    }],
  },
  // 关注用户
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  },
  // 关注话题
  followingTopics: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],

  },
  // 赞回答
  likingAnswer: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],

  },
  // 踩回答
  dislikingAnswer: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],

  },
}, { timestamps: true })

module.exports = model('User', usersModel)