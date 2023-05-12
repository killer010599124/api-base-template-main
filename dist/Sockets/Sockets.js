"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * Add yours methods for websocket here
 */

const disconnectSocket = exports.disconnectSocket = socket => {
  socket.on('disconnect', () => {
    console.log('Cliente desconectado.');
  });
};
exports.default = {
  disconnectSocket
};