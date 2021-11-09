const { request, response } = require('express');

const isAdmin = ( req = request, res = response, next ) => {

    if ( !req.user ){
        return res.status(500).json({
            msg: "Validation without token"
        })
    }

    const { rol, nombre } = req.user

    if ( rol !== 'ADMIN_ROL' ){
        return res.status(401).json({
            msg: `${ nombre } Unauthorizer user`
        });
    }

    next();
}

const roleExist = ( ...roles ) => {

    return ( req = request, res = response, next ) => {
        
        if ( !req.user ){
            return res.status(500).json({
                msg: "Validation without token"
            })
        }

        if ( !roles.includes( req.user.rol ) ){
            return res.status(500).json({
                msg: "Invalid rol"
            })
        }

        next();
    }

}

module.exports = { 
    isAdmin,
    roleExist
}