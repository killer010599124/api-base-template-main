/*
 * Add yours methods for websocket here
 */

export const disconnectSocket = (socket) => {
  socket.on('disconnect', () => {
    console.log('Cliente desconectado.');
  });
};

export default { disconnectSocket };
