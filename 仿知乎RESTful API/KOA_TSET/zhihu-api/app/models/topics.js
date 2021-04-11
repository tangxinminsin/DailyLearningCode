const mongoose = require('mongoose')

const { Schema, model } = mongoose

const topicModel = new Schema({
  __v: { type: Number, select: false },//查询时隐藏__v字段
  name: { type: String, required: true },
  avatar_url: { type: String, required: false },
  introduction: {
    type: String,
    required: false,
    select: false
  }
}, { timestamps: true })

module.exports = model('Topic', topicModel)