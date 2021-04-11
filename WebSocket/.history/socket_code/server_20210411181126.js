const express = require('express')
const app = express()
const http = require('http')(app)
const port = 3000
const io = require('socket.io')(http)
app.get('/', (req, res) => {
  res.sendFile(__dirname, +'index.html')
})

http.listen(port, () => {
  console.log(`http://localhost:${port}`)
})