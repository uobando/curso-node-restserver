const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const { apikey, nombre='No name', page=1, limit } = req.query;    

    res.json({
        msg: 'get API - Controlador',
        apikey,
        nombre,
        page,
        limit
    });
}

const usuariosPost = (req = request, res = response) => {
    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - Controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req = request, res = response) => {
    const id = req.params.id;

        res.json({
        msg: 'put API - Controlador',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}