import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import app from './app';

const Socketapi = () =>
  app.io.on(
    'connection',
    (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
      console.log(socket.id, 'A user connected');
    },
  );

export default Socketapi;
