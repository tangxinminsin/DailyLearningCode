const mongoose = require('mongoose')

const { Schema, model } = mongoose

const usersModel = new Schema({
  __v: { type: Number, select: false },//查询时隐藏__v字段
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
  avatar_url: { type: String },
  gender: { type: String, enum: ['male', 'female'], default: 'male', required: true },//男女枚举
  headline: { type: String },
  locations: { type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }], select: false },
  employments: {//职业——数组对象
    type: [{
      company: { type: Schema.Types.ObjectId, ref: 'Topic' },
      job: { type: Schema.Types.ObjectId, ref: 'Topic' }
    }],
    select: false
  },
  // 关注用户
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    select: false
  },
  // 关注话题
  followingTopics: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    select: false
  },
  // 赞回答
  likingAnswer: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    select: false
  },
  // 踩回答
  dislikingAnswer: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    select: false
  },
}, { timestamps: true })

module.exports = model('User', usersModel)