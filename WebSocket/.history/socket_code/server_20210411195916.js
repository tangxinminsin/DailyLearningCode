const express = require('express')
var app = express()
const http = require('http').createServer(app)
const port = 3000
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})


io.on('connection', (socket) => {
  console.log('socket connected');
  socket.on('chatEvent', (msg) => {
    console.log('msg from client:' + msg);
    socket.send('server send:' + msg)
  })
})

http.listen(port, () => {
  console.log(`http://localhost:${port}`)
})