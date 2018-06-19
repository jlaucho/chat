const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');

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

        callback( personas );

        // console.log('usuario conectado', usuario.nombre)
    });
    
    client.on('disconnect', ()=>{
        // console.log('esta pasando por disconnect');
        let personaBorrada = usuarios.borrarPersona( client.id );

        client.broadcast.emit('personaSalio', personaBorrada);
        client.broadcast.emit('listaPersonas', usuarios.getPersonas());
    });
});