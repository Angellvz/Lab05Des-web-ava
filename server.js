// Importar las dependencias
const express = require('express');  // Se importa express
const app = express();              // Se crea una app express
const http = require('http').Server(app); // Crear un servidor http con express
const io = require('socket.io')(http);    // Crear una instancia de Socket.IO con el servidor HTTP

// Ruta para el archivo HTML
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');   // usar el archivo index.html
});

// Escuchar la conexión de Socket.IO
io.on('connection', function(socket){
    console.log('Usuario conectado');   // Conexion del usuario

    // Escuchar el evento 'chat message 1' para el chat 1
    socket.on('chat message 1', function(msg){
        console.log('Mensaje del chat 1: ' + msg);  // muestra los mensajes en consola
        io.emit('chat message 1', msg);             // emite el mensjae en la lista de mensajes html
    });

    // Escuchar el evento 'chat message 2' para el chat 2
    socket.on('chat message 2', function(msg){
        console.log('Mensaje del chat 2: ' + msg);  // muestra los mensajes en consola
        io.emit('chat message 2', msg);             // emite el mensjae en la lista de mensajes html
    });

    // Escuchar la desconexión del usuario
    socket.on('disconnect', function(){
        console.log('Usuario desconectado');  // Desconexion del usuario al recargar la pagina
    });
});

// Iniciar el servidor HTTP en el puerto 3000
http.listen(3000, function(){
    console.log('Servidor escuchando en http://localhost:3000');  
});
