"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = exports.listenSockets = exports.app = undefined;
var _express = require("express");
var _express2 = _interopRequireDefault(_express);
var _http = require("http");
var _http2 = _interopRequireDefault(_http);
var _socket = require("socket.io");
var _redis = require("redis");
var _redisAdapter = require("@socket.io/redis-adapter");
var _Sockets = require("./Sockets/Sockets");
var _GlobalFunctions = require("./Functions/GlobalFunctions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _GlobalFunctions.loadEnv)();
const {
  REDIS_ACTIVE,
  REDIS_USER,
  REDIS_PASS,
  REDIS_HOST
} = process.env;
const redisActive = REDIS_ACTIVE === 'true';
const app = exports.app = (0, _express2.default)();
const server = _http2.default.createServer(app);
const io = new _socket.Server(server, {
  cors: {
    origin: '*'
  }
});
if (typeof redisActive === 'boolean' && redisActive || typeof redisActive === 'string' && redisActive === 'true') {
  const pubClient = (0, _redis.createClient)({
    username: REDIS_USER || 'default',
    password: REDIS_PASS || '',
    url: REDIS_HOST || ''
  });
  const subClient = pubClient.duplicate();
  io.adapter((0, _redisAdapter.createAdapter)(pubClient, subClient));
}
const listenSockets = exports.listenSockets = () => {
  console.log('Escuchando sockets');
  io.on('connection', socket => {
    io.on('join_room', room => {
      socket.join(room);
    });
    io.on('send', data => {
      io.in(data.room).emit('message', data);
    });
    (0, _Sockets.disconnectSocket)(socket);
  });
};
const startServer = exports.startServer = (port, callback) => {
  listenSockets();
  server.listen(port, callback);
};