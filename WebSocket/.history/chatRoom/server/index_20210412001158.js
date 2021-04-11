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
      // 判断非自己的客户端
      if (ws !== client && client.readyState === WebSocket.OPEN) {
        client.send('server:' + msg)
      }

    })
  })
})