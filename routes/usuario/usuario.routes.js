const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos.middleware');
const route = express();
const { 
    getUsuario,
    postUsuario,
    putUsuario,
    patchUsuario
 } = require('../../controller/usuario/usuario.controller');

route.route('/usuario')
    .get(getUsuario)
    .post([
        check('nombre', 'El nombre no es valido').not().isEmpty(),
        check('password', 'El password no es valido, mas de 6 letras').isLength({ min: 6 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('rol', 'Rol invalido').isIn(['ADMIN_ROL','USER_ROL']),
        validarCampos
    ],postUsuario)
    .put(putUsuario)
    .patch(patchUsuario);

module.exports = route;