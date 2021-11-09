const validarCampos = require('./validar-campos.middleware');
const validarJWT = require('./validar-jwt.middleware');
const validaRol = require('./validar-rol.middleware');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRol
}