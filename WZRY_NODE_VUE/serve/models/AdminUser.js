
const mongoose = require('mongoose')
const { Schema, model } = mongoose

const schema = new Schema({
  username: { type: String },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  }
})
module.exports = model('AdminUser', schema)
