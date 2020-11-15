import socketio from 'socket.io-client';

class WebSocket {
  constructor() {
    this.socket = socketio('http://localhost:8000', {
      autoConnect: false,
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }
  connect() {
    this.socket.connect();
  }
  subscribeToNewProducts(subscribeFunction) {
    this.socket.on('new-product', subscribeFunction);
  }
}

export default new WebSocket();
