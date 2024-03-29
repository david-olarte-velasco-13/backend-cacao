


const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {

    
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {


    

    const { nombre, correo, password, documento } = req.body;
    const usuario = new Usuario({nombre, correo, password, documento});



   

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt); 

    //Guardar en base de datos

    await usuario.save();

    res.json({
        msg: 'post API - cont',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;  
    const {_id, password, correo, documento, ...resto} = req.body;

    //TODO validar contra base de datos 
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto );

    res.json(usuario);
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    //Borrado por cambio de estado

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});


    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}