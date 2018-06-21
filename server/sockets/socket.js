const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');


const usuarios = new Usuarios();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('entrarChat', (usuario, callback)=>{
        if (!usuario.nombre){
            return callback({
                error: true,
                message: 'El nombre del usuario es requerido'
            });
        }
        
        let personas = usuarios.agregarPersona(client.id, usuario.nombre);

        client.broadcast.emit('listaPersonas', usuarios.getPersonas());
        client.broadcast.emit('crearMensaje', crearMensaje(usuario.nombre, 'entro a la sala de chat'));

        callback( personas );

        // console.log('usuario conectado', usuario.nombre)
    });
    
    client.on('disconnect', ()=>{
        let personaBorrada = usuarios.borrarPersona( client.id );

        client.broadcast.emit('crearMensaje', crearMensaje(personaBorrada.nombre, 'Salio de la sala de chat'));
        client.broadcast.emit('listaPersonas', usuarios.getPersonas());
    });

    client.on('crearMensaje', data =>{
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.emit('crearMensaje', mensaje);
    });

    //Mensaje privados
    client.on('mensajePrivado', data =>{
        let persona = usuarios.getPersona( client.id )
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje( persona.nombre, data.mensaje ))
    });
});