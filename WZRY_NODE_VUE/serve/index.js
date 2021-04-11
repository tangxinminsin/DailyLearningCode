
const express = require('express')
const path = require('path')
const app = express()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(require('cors')())
app.use(express.json())

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3001, () => {
  console.log('http://localhost:3001')
})