const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 3030,
});

wss.on('connection', (ws) => {
  console.log('connection success');
  ws.on('message', (msg) => {
    console.log('server:', msg)
  })
})