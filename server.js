const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server

const wss = new WebSocketServer({
    port: 8333,
})

wss.on('connection', function (ws) {
    console.log('connection')
    ws.on('message', function (message) {
        console.log(JSON.parse(message))
    })
    ws.on('close', function () {
        console.log('close')
    })
})

console.log('create')