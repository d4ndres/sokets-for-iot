


// Servido de express
const express = require('express');
const app = express();

// Servidor de socket
const server = require('http').createServer(app);

//Configuracion del socker
const io = require('socket.io')(server);


// Desplegar el directorio publico
app.use( express.static(__dirname + '/public'));


io.on('connection', ( socket ) => {
  
  console.log('Cliente conectado!', socket.id )
  if( socket?.id ) {
    socket.emit('mensaje-bienvenida', {
      mensaje: 'Bienvenido al servidor',
      fecha: new Date()
    });
  }

  socket.on('cliente2server', ( payload ) => {
    console.log(socket.id, ' ', payload);
    io.emit('server2cliente', payload);
  })

});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});