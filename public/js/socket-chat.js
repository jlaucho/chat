var socket = io();

var params = new URLSearchParams(window.location.search);

// console.log( params );

if(!params.has('nombre')) {
    throw new Error('El nombre para ingresar es necesario');
}

let usuario = {
    nombre: params.get('nombre')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat',usuario, function(usuarios){
        console.log(usuarios);
    });
});

socket.on('listaPersonas', function( personas ){
    console.log(personas);
});

// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log(mensaje);

});

//Mensajes privados
socket.on('mensajePrivado', function( mensaje ){
    console.log(mensaje);
});