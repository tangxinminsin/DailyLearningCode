const mongoose = require('mongoose')

const { Schema, model } = mongoose

const answerModel = new Schema({
  __v: { type: Number, select: false },//查询时隐藏__v字段
  content: { type: String, required: true },
  answerer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true, select: false },
  voteCount: { type: Number, required: true, default: 0 },
  commentCount: { type: Number, default: 0, required: true }
}, { timestamps: true })

module.exports = model('Answer', answerModel)