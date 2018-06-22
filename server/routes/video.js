const express = require("express");
const fs = require("fs");
const path = require("path");

const videoRoute = express();

videoRoute.get('/:video', (request, response, next)=>{

    let video = request.params.video;

    let pathFile = path.resolve(`${ __dirname }/../../public/videos/${ video }`);
    let estado;
    if(!fs.existsSync(pathFile)){
        return response.status(400).json({
            ok:false,
            mensaje: `El video ${ video } no existe en nuestra base de datos`
        });
    } 

    let readStream = fs.createReadStream(pathFile);
    readStream.on('readable', ()=>{
        readStream.pipe( response )
    });

    readStream.on('error', function(err) {
        res.end(err);
      });
    
    // return response.status(200).json({
    //     ok:true,
    //     mensaje:'Hola',
    //     video: video,
    //     pathFile,
    //     estado
    // });
});

module.exports = {
    videoRoute
};