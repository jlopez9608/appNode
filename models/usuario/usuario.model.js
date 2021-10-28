const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    usuario: {
        type: String,
        required: [true, 'El usuario es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROL','USER_ROL']
    }
});

module.exports = model('usuario', usuarioSchema);