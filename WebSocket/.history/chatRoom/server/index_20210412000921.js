const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 3030,
});

wss.on('connection', (ws) => {
  console.log('connection success');
  ws.on('message', (msg) => {
    // ws.send('server:' + msg)
    //广播消息
    wss.clients.forEach(client => {
      client.send('server:' + msg)
    })
  })
})