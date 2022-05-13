const Usuario = require('../models/usuario');

const emailExiste = async( correo = '') => {

    //Verificar si el correo existe
    
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail){
        throw new Error('El correo ya esta registrado')
    }

}

const documentoExiste = async(documento = '') => {
    
     //Verificar si el documento existe

     const existeDocumento = await Usuario.findOne({ documento });
     if (existeDocumento){
         throw new Error('El documento ya esta registrado')
     }
}

const existeUsuarioPorId = async( id = '') => {

    //Verificar si el correo existe
    
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario){
        throw new Error('El id no existe')
    }

}


module.exports = {
    emailExiste,
    documentoExiste,
    existeUsuarioPorId
}