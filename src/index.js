import http from 'http';
import winston from 'winston';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

/**
 * Connect to mongoDB
 */
const uri = config.mongo.uri;

mongoose.connect(uri);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => {
    console.log(`Connection to ${uri} established.`);
});
db.on('disconnected', () => {
    console.log(`Connection to ${uri} disconnected.`);
});
db.on('error', (err) => {
    console.log(`Error occured: ${err}.`);
});

// @todo: config
const PORT = '3000';

const normalizePort = (value) => {
  const port = parseInt(value, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return value;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || PORT);

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      winston.log('error', `${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      winston.log('error', `${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  winston.log('info', `Listening on ${bind}`);
});
