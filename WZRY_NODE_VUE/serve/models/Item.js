
const mongoose = require('mongoose')
const { Schema, model } = mongoose

const schema = new Schema({
  name: { type: String },
  icon: { type: String },
})
module.exports = model('Item', schema)
