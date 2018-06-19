class Usuarios {
    constructor(){
        this.personas = [];
    }

    agregarPersona( id, nombre ) {
        let persona = {
            id,
            nombre
        }
        this.personas.push( persona );
        return this.personas;
    }

    getPersona( id ){
        let persona = this.personas.filter( persona => persona.id === id)[0];
        return persona;
    }

    getPersonas(){
        return this.personas;
    }

    getPersonaPorSala() {
        return;
    }

    borrarPersona(id){
        let personaBorrada = this.getPersona(id);
        let temp_personas = this.personas.filter( persona => persona.id != id );

        this.personas = temp_personas;
        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}