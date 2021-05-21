const mongoose = require('mongoose')

const { Schema, model } = mongoose

const questionModel = new Schema({
  __v: { type: Number, select: false },//查询时隐藏__v字段
  title: { type: String, required: true },
  description: { type: String, required: false },
  questioner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  questionName: { type: String, required: true },
  topics: { type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }], required: false },
  topicsName: { type: [{ type: String }], required: false }
}, { timestamps: true })

module.exports = model('Question', questionModel)