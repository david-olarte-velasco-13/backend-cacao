const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next ) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const {uid} = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        //Leer el usuario al que corresponde el uid
        const usuario = await Usuario.findById(uid);

        //Verificar si el usuario existe
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario inexistente en DB'
            });
        }

        //verificar si el uid tiene estado : true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            });
            
        }

        next();
    } catch (error) {
        console.log(token);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }

    

    
}

module.exports = {
    validarJWT
}