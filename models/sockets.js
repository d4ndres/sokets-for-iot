

// io.on('connection', ( socket ) => {
  
//   console.log('Cliente conectado!', socket.id )
//   if( socket?.id ) {
//     socket.emit('mensaje-bienvenida', {
//       mensaje: 'Bienvenido al servidor',
//       fecha: new Date()
//     });
//   }

//   socket.on('cliente2server', ( payload ) => {
//     console.log(socket.id, ' ', payload);
//     io.emit('server2cliente', payload);
//   })

// });

class Sockets {
  constructor( io ) {
    this.io = io

    this.socketEvents();
  }

  socketEvents() {

    // On connection
    this.io.on('connection', ( socket ) => {

      // escucha el evento mensaje-to-server
      socket.on('cliente2server', (data) => {
        console.log(data);
        this.io.emit('server2cliente', data);
      })
    })
  }
}

module.exports = Sockets;