const { request, response } = require('express');
const Usuario = require('../../models/usuario/usuario.model');
const bcrypt = require('bcryptjs');

const getUsuario = (req = request, res = response)=>{
    res.json('GET - API');
}

const postUsuario = async (req = request, res = response)=>{
    // const { nombre, ...resto } = req.body;
    // const usuario = new Usuario( resto );
    const { nombre, correo, usuario, password, rol } = req.body;
    const user = new Usuario( { nombre, correo, usuario, password, rol } );

    // Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    // Verificar si el correo existe
    const isCorreo = await Usuario.findOne({ correo });
    if ( isCorreo ){
        return res.status(400).json({ msg: 'El correo existe' });
    }

    await user.save();
    res.json({
        msg: 'Usuario agregado',
        user
    });

}

const putUsuario = (req = request, res = response)=>{
    res.json('GET - API');
}

const patchUsuario = (req = request, res = response)=>{
    res.json('GET - API');
}
module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    patchUsuario
}