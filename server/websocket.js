const ws = require('ws')

const wss = new ws.Server(
    {
        port: 5500,
    },
    () => console.log('Server started...')
)

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break
            case 'connection':
                broadcastMessage(message)
                break

            default:
                break
        }
    })
})

function broadcastMessage(message) {
    server.clients.forEach((client) => {
        client.send(JSON.stringify(message))
    })
}
