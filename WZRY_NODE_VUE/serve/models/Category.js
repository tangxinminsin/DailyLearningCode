
const mongoose = require('mongoose')
const { Schema, model } = mongoose

const schema = new Schema({
  parent: { type: Schema.Types.ObjectId, ref: 'Category' },
  name: { type: String }
})
module.exports = model('Category', schema)
