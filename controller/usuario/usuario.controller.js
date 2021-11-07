const { request, response } = require('express');
const Usuario = require('../../models/usuario/usuario.model');
const bcrypt = require('bcryptjs');

const getUsuario = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };

    const usersPromise = Usuario.find(query)
        .limit(Number(limit))
        .skip(Number(from))

    const totalPromise = Usuario.countDocuments(query);

    const [totalRes, usersRes] = await Promise.all([
        totalPromise,
        usersPromise
    ])

    res.json({
        totalRes,
        usersRes
    });

}

const postUsuario = async (req = request, res = response) => {
    // const { nombre, ...resto } = req.body;
    // const usuario = new Usuario( resto );
    const { nombre, correo, usuario, password, rol } = req.body;
    const user = new Usuario({ nombre, correo, usuario, password, rol });

    // Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    res.json({
        user
    });

}

const putUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, ...resto } = req.body;

    if (password) {
        // Encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
    }

    const user = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'PUT - API',
        id
    });
}

const patchUsuario = (req = request, res = response) => {
    res.json('PATCH - API');
}

const deleteUsuario = async (req = request, res = response) => {
    
    // const user = await Usuario.findByIdAndDelete( id );
    const { id } = req.params;
    
    const user = await Usuario.findByIdAndUpdate( id, { estado: false } );
    
    res.json({
        user
    });
}

module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    patchUsuario,
    deleteUsuario
}