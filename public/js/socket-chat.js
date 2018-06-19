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

// escuchar
// socket.on('disconnect', function() {
    
//     console.log('Perdimos conexión con el servidor');

// });

socket.on('personaSalio', function( persona ){
    console.log('El usuario ' + persona.nombre + ' salio del chat');
});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});