#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app.mjs';
import DBG from 'debug';
const debug = DBG('notes:server-debug');
const error = DBG('notes:server-error');
import http from 'http';
import https from 'https';
import fs from 'fs';
//import forceSsl from 'express-force-ssl';
/**
 * Get port from environment and store in Express.
 */
var port, server,
keysDir = process.env.APP_CERTBOT_KEYS_DIR,
key = process.env.APP_CERTBOT_KEYS_PRIVKEY,
cert = process.env.APP_CERTBOT_KEYS_CERT,
ca = process.env.APP_CERTBOT_KEYS_CA;

if(process.env.APP_SERVER_PROTOCOL === 'https' && keysDir && key && cert && ca){
  port = normalizePort(process.env.APP_HTTPS_PORT || '443');
  server = https.createServer({
    key: fs.readFileSync(`${keysDir}/${key}`),
    cert: fs.readFileSync(`${keysDir}/${cert}`),
    ca: fs.readFileSync(`${keysDir}/${ca}`)
  },app);
  //app.use(forceSsl);
}else{
  port = normalizePort(process.env.APP_HTTP_PORT || '80');
  server = http.createServer(app);
}

app.set('port', port);

/**
 * Create HTTP server.
 */



/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
