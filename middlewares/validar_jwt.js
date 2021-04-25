const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    // Verificar si el token fue enviado en la cabecera
    if (! token) {
        return res.status(401).json({
            msg: 'No hay token'
        });
    }

    // Verificar si es un JWT válido
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // console.log(`token: ${token}`);
        // console.log(uid);

        // Consulto el usuario
        const usuario = await Usuario.findById(uid);

        if (! usuario) {
            return res.status(401).json({
                message: 'No autorizado - Usuario no existe'
            })
        }

        // Verifico si el usuario no ha sido eliminado
        if (! usuario.estado) {
            return res.status(401).json({
                message: 'No autorizado - Usuario eliminado'
            })
        }

        // Inyectar datos del usuario autenticado en el request para usarlos en los controllers
        req.usuario = usuario;

        next();
    } catch (error) {// Se dispara el error si el JWT es inválido
        console.log(error);
        res.status(401).json({
            msg: 'Token inválido.'
        })
    }


}

module.exports = {
    validarJWT
}