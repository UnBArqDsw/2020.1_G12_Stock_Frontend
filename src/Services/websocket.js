import socketio from 'socket.io-client';

class WebSocket {
  constructor() {
    this.socket = socketio(process.env.REACT_APP_PROD_SOCKET_URL, {
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

  subscribeToUpdateProduct(subscribeFunction) {
    this.socket.on('update-product', subscribeFunction);
  }
}

export default new WebSocket();
