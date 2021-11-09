const express = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../../middlewares/validar-campos.middleware');
const { login } = require('../../controller/auth/auth.controller');

const appRoute = express();

appRoute.route('/login')
    .post([
            check('usuario').not().isEmpty(),
            check('password').not().isEmpty()
        ],
        validarCampos,
        login)


module.exports = appRoute;