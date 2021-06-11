const { response } = require("express");
const bcrypt = require('bcryptjs');

// MODELS
const Client = require('../models/clients.model');
// MODELS

// JWT
const { generarJWT } = require("../helpers/jwt");
// JWT

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // VALIDAR EMAIL
        const clientDB = await Client.findOne({ email });

        if (!clientDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email ó Contraseña incorrecto'
            });
        }

        // VALIDAR PASSWORD
        const validaPassword = bcrypt.compareSync(password, clientDB.password);

        if (!validaPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Email ó Contraseña incorrecto'
            });
        }

        // GENERAR TOKEN - JWT
        const token = await generarJWT(clientDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });

    }

}

// MODULE EXPORTS
module.exports = {
    login
};