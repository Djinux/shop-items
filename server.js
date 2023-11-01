const http = require('http')
const app = require('./app')

// create server with the app.js app
const server = http.createServer(app)
const port = 3000
server.listen(port)

server.once('listening', function () {
  console.info(`Started the server on http://localhost:${port}`)
})