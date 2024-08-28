// Servido de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    console.log(this.port)

    // Http server
    this.server = http.createServer(this.app);

    // Configuración del socket
    this.io = socketio(this.server, {
      // configuraciones
      // todos los origenes
      origins: "*:*",
      // todos los metoodos
      methods: ["*"]
    })
  }

  middlewares() {
    this.app.use( express.static( path.resolve( __dirname, '../public' ) ) )
    // cors
    this.app.use( cors() )
  }
  configurarSockets() {
    new Sockets( this.io )
  }

  execute() {
    // Inicializar middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Inicializar sockets
    this.server.listen( this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`)
    });
  }
}


module.exports = Server;