const WebSocket = require('ws')

const ws = new WebSocket('ws://127.0.0.1:3030')

ws.on('open', () => {
  console.log('client is connnected to Server')
  ws.send('this is client send')
  ws.on('message', (msg) => {
    console.log(msg)
  })
})