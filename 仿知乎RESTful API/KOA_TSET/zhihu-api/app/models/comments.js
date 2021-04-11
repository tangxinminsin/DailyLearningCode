const mongoose = require('mongoose')

const { Schema, model } = mongoose

const commentModel = new Schema({
  __v: { type: Number, select: false },//查询时隐藏__v字段
  content: { type: String, required: true },
  commentator: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true, },
  answerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
  rootCommentId: { type: String, required: false, },
  replayTo: { type: Schema.Types.ObjectId, ref: 'User', required: false, },
}, { timestamps: true })

module.exports = model('Comment', commentModel)