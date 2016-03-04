/*********************************
ESTA SERIA LA PARTE SERVIDOR
**********************************/

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// 
app.use(express.static(__dirname + '/public'));


// LE DECIMOS QUE LA CONEXION LA RECIBIRA EL index.html
app.get('/', function(req, res){
  res.sendfile('index.html');
});

var equipoAzul          = 0;
var equipoRojo          = 0;
var azul                = true;
var contador            = 0;
var estiraLugar         = 0;
var cuerdaInicial       = 661;
var cuerdaLeftDinamica  = 661; // POSICION INICIAL DE LA CUERDA

// DECIMOS QUE AL CONECTAR HAGA EL CONTENIDO DE LA FUNCION
io.on('connection', function(socket){

  socket.on('estira', function(data){
      console.log("posicion cuerda: "+cuerdaLeftDinamica+"  direccion: "+data["direccion"]+" contador: "+data["cont"]);
      cuerdaLeftDinamica  = cuerdaLeftDinamica + parseInt(data["direccion"]);
      contador            = data["cont"];
      estiraLugar         = data["direccion"];

      io.emit('estira', {estiraLugar: estiraLugar});
  });


  socket.on('userConected', function(msg){
      console.log(msg);
  });


  socket.on('partidaFin', function(msg){
    if(msg['msg']==="true") {
      //console.log("GAME OVER");
      cuerdaLeftDinamica = cuerdaInicial;
      contador = 0;
      equipoAzul = 0;
      equipoRojo = 0;
      azul = true;
    }
   
  });


  socket.on('empezarPartida', function(msg){
      if(azul){
        equipoAzul++;
        azul = false;
        io.sockets.connected[socket.id].emit('direccion', {direccion: '1', cont: contador, posicion: cuerdaLeftDinamica});        
      }else{
        equipoRojo++;
        io.sockets.connected[socket.id].emit('direccion', {direccion: '2', cont: contador, posicion: cuerdaLeftDinamica});
        azul = true;
      }
      console.log("equipo rojo: "+equipoRojo+" equipo azul: "+equipoAzul+" total jugadores: "+azul+" contador: "+contador);
  });


  // AL DESCONECTAR QUE PINTE POR PANTALLA
  // 'user disconnected'
  socket.on('disconnect', function(){
      console.log('user disconnected');
      
  });


});

// LE DECIMOS EL PUERTO POR EL QUE TIENE QUE ESTAR CONECTADO
// Y LO PRINTAMOS POR CONSOLA
http.listen(3000, function(){
    console.log('listening on *:3000');
});