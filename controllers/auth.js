const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar_jwt');

const login = async(req, res = response) => {
    const { correo, password } = req.body;

    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (! usuario) {
            return res.status(400).json({
                msg: 'El usuario o contraseña son incorrectos. - correo'
            });
        }

        // Verificar si el usuario está activo
        if (! usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario o contraseña son incorrectos. - estado false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (! validPassword) {
            return res.status(400).json({
                msg: 'El usuario o contraseña son incorrectos. - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Login OK',
            usuario,
            token
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Ocurrió un error al iniciar sesión.'
        });
    }
}

module.exports = {
    login
}