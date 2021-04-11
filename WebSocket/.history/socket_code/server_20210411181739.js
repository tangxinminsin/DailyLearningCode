const app = require('express')()
const http = require('http').createServer(app)
const port = 3000
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname, +'/socket_code/index.html')
})

http.listen(port, () => {
  console.log(`http://localhost:${port}`)
})