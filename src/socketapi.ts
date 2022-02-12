import { Server } from 'socket.io';
const io = new Server();

io.on('connection', (socket) => {
  // socket implementation
  console.log(socket, '***');
});

export default io;
