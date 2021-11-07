const Role = require('../models/rol/rol.model');
const Usuario = require('../models/usuario/usuario.model');

const rolValid = async (rol = '') => {
    const existRol = await Role.findOne({ rol })
    if (!existRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const emailExist = async (correo) => {
    const isCorreo = await Usuario.findOne({ correo });
    if (isCorreo) {
        throw new Error(`El correo ${correo} ya esta registrado en la base de datos`);
    }
}

const userExist = async (id) => {
    const isUser = await Usuario.findById(id);
    if ( !isUser ) {
        throw new Error(`El id ${ id } no existe`);
    }
}

module.exports = {
    rolValid,
    emailExist,
    userExist
}