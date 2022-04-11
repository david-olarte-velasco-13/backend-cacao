


const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const {q, nombre, apikey}= req.query;

    res.json({
        msg: 'get API - cont',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        msg: 'post API - cont',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {

    const {id} = req.params;  

    res.json({
        msg: 'put API - cont',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - cont'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}