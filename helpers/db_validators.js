const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol='') => {
    // Busco el rol en la base de datos
    const existeRol = await Role.findOne({rol});

    if (! existeRol) {
        throw new Error(`El rol ${rol} no existe en la base de datos.`)
    }
}

const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({correo});
    
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado.`)
    }
}

const idExiste = async (id) => {
    const existeId = await Usuario.findById(id);
    
    if (! existeId) {
        throw new Error(`El Id ${id} no existe.`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    idExiste
}