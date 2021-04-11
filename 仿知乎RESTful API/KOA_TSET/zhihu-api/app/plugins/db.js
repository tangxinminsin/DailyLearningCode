module.exports = (app) => {
  const mongoose = require("mongoose")
  const { mongoConnectUrl } = require('../config')
  mongoose.connect(mongoConnectUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }, function (err) {
    if (err) {
      console.log('Connection Error:' + err)
    } else {
      console.log('Connection success!')
    }
  });
  // mongoose.connection.on('error', console.error)
}