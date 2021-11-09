const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../../models/usuario/usuario.model');
const { getJWT } = require('../../helper/generate-jwt');

const login = async ( req = request, res = response )=>{

    try {
        const { usuario, password } = req.body;

        const user = await Usuario.findOne({ usuario });

        if ( !user ){
            return res.status(400).json({
                msg: "User not found"
            })
        }

        if ( !user.estado ){
            return res.status(400).json({
                msg: "User deleted"
            })
        }
    
        const validPassword = bcryptjs.compareSync( password, user.password );

        if ( !validPassword ){
            return res.status(400).json({
                msg: "Invalid password"
            })
        }

        const token = await getJWT( user._id );

        res.json({
            user,
            token
        });   
    } catch (error) {
        
    }

}

module.exports = {
    login
}