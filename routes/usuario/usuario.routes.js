const express = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../../middlewares/validar-campos.middleware');
const { rolValid, emailExist, userExist } = require('../../helper/db-validators');

const appRoute = express();
const { 
    getUsuario,
    postUsuario,
    putUsuario,
    patchUsuario,
    deleteUsuario
 } = require('../../controller/usuario/usuario.controller');

 appRoute.route('/usuario')
    .get( getUsuario )
    .post([
        check('nombre', 'El nombre no es valido').not().isEmpty(),
        check('password', 'El password no es valido, mas de 6 letras').isLength({ min: 6 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( emailExist ),
        // check('rol', 'Rol invalido').isIn(['ADMIN_ROL','USER_ROL']),
        check('rol').custom( rolValid ),
        validarCampos
    ],postUsuario)
    .patch( patchUsuario );

    appRoute.route('/usuario/:id')
    .put( [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom( userExist ),
        // check('rol').custom( rolValid ),
        validarCampos
    ], putUsuario )
    .delete( [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom( userExist ),
        // check('rol').custom( rolValid ),
        validarCampos
    ], deleteUsuario );
    
module.exports = appRoute;