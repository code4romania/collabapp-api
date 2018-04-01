import http from 'http'
import mongoose from 'mongoose'
import winston from 'winston'
import app from './app'
import config from './config'

/**
 * Connect to mongoDB
 */
const uri = config.MONGO.URI

mongoose.connect(uri)
mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('error', winston.error.bind(winston, 'MongoDB connection error:'))
db.on('connected', () => winston.log('info', `Connection to ${uri} established.`))
db.on('disconnected', () => winston.log('info', `Connection to ${uri} disconnected.`))

const normalizePort = (value) => {
  const port = parseInt(value, 10)

  if (Number.isNaN(port)) {
    // named pipe
    return value
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

const port = normalizePort(process.env.PORT || config.PORT)

app.set('port', port)

const server = http.createServer(app)

server.listen(port)

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      winston.log('error', `${bind} requires elevated privileges`)
      process.exit(1)
      break // eslint-disable-line
    case 'EADDRINUSE':
      winston.log('error', `${bind} is already in use`)
      process.exit(1)
      break // eslint-disable-line
    default:
      throw error
  }
})

server.on('listening', () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  winston.log('info', `Listening on ${bind}`)
})
