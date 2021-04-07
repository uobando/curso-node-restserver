const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria.']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio.'],
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SELLER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

// Debe ser una función normal porque se va a referenciar a la instancia del objeto usando this
usuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', usuarioSchema);