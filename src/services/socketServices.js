import {socket} from '../apis/SocketClient';

export const socketOn = (event, callback) => {
  socket.on(event, callback);
};

export const socketOff = event => {
  socket.off(event);
};

export const socketEmit = (event, data) => {
  socket.emit(event, data);
};

export const socketDisconnect = () => {
  socket.disconnect();
};
