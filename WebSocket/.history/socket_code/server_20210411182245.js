const express = require('express')
var app = express()
const http = require('http').createServer(app)
const port = 3000
const io = require('socket.io')(http)

app.use(express.static('/'))
app.get('/', (req, res) => {
  res.sendFile(__dirname, +'/index.html')
})

http.listen(port, () => {
  console.log(`http://localhost:${port}`)
})