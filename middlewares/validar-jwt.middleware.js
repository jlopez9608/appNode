const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const Usuario = require('../models/usuario/usuario.model');

const validarJWT = async ( req = request, res = response, next ) => {

    const token = req.header( 'authToken' );

    if ( !token ){
        return res.status(401).json({
            msg: 'Unauthorizer'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const user = await Usuario.findById( uid );

        if ( !user ){
            return res.status(401).json({
                msg: 'Unauthorizer'
            }) 
        }

        if ( !user.estado ){
            return res.status(401).json({
                msg: 'Unauthorizer'
            })
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Invalid Token'
        })
    }
}

module.exports = {
    validarJWT
} 