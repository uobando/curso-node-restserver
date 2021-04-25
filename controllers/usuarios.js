const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    const { limit = 5, desde = 0 } = req.query;

    // const total = await Usuario.countDocuments({estado: true});
    // const usuarios = await Usuario.find({estado: true})
    //     .skip(Number(desde))
    //     .limit(Number(limit));

    // Se usa promesa cuando hay más de un query que ejecutar los cuales no dependen uno del otro
    // La resp es una colección de promesas. Se pone el await para resolver ambas promesas antes de enviar el resultado
    // Al desestructurar la respuesta de las 2 promesas obtengo el total y los usuarios [total, usuarios]
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
            .skip(Number(desde))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body; // El operador rest { google, ... resto }
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verificar si el correo existe
    // const existeEmail = await Usuario.findOne({ correo });
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: 'El correo ya existe.'
    //     });
    // }

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar registro
    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const usuariosPut = async (req = request, res = response) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    // Validar id en base de datos

    if (password) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        usuario
    });

    // ESTO ES DEL OTRO CURSO - DEVUELVE EL OBJETO ACTUALIZADO
    // const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true}, (err, userUpdated) => {
    //     if (err) return res.status(500).send({message: 'Error en la petición.'});
    //     if (!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario.'});

    //     res.status(200).send({user: userUpdated});
    // });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    // Borrado físico
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuarioAutenticado = req.usuario;

    // Verifico si es Administrador
    if (usuarioAutenticado.rol != 'ADMIN_ROLE') {
        return res.status(403).json({
            msg: 'Sin permiso.'
        });
    }

    // Borrado lógico
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

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