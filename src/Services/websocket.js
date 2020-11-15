import socketio from 'socket.io-client';

class WebSocket {
  constructor() {
    this.socket = socketio('http://localhost:8000', {
      autoConnect: false,
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }
  connect(idCompany) {
    this.socket.io.opts.query = {
      idCompany,
    };
    this.socket.connect();
  }

  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }
  subscribeToNewProducts(subscribeFunction) {
    this.socket.on('new-product', subscribeFunction);
  }
}

export default new WebSocket();
