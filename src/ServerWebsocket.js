import express from 'express';
import http from 'http';
import { Server as ServerSocket } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { disconnectSocket } from './Sockets/Sockets';
import { loadEnv } from './Functions/GlobalFunctions';

loadEnv();

const { REDIS_ACTIVE, REDIS_USER, REDIS_PASS, REDIS_HOST } = process.env;

const redisActive = REDIS_ACTIVE === 'true';

export const app = express();
const server = http.createServer(app);
const io = new ServerSocket(server, {
  cors: {
    origin: '*',
  },
});

if ((typeof redisActive === 'boolean' && redisActive) || (typeof redisActive === 'string' && redisActive === 'true')) {
  const pubClient = createClient({
    username: REDIS_USER || 'default',
    password: REDIS_PASS || '',
    url: REDIS_HOST || '',
  });

  const subClient = pubClient.duplicate();

  io.adapter(createAdapter(pubClient, subClient));
}

export const listenSockets = () => {
  console.log('Escuchando sockets');

  io.on('connection', (socket) => {
    io.on('join_room', (room) => {
      socket.join(room);
    });
    io.on('send', (data) => {
      io.in(data.room).emit('message', data);
    });

    disconnectSocket(socket);
  });
};

export const startServer = (port, callback) => {
  listenSockets();
  server.listen(port, callback);
};
