
const mongoose = require('mongoose')
const { Schema, model } = mongoose

const schema = new Schema({
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  title: { type: String },
  content: { type: String }
})
module.exports = model('Article', schema)
