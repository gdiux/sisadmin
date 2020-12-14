const { response } = require('express');
const bcrypt = require('bcryptjs');

// JWT
const { generarJWT } = require("../helpers/jwt");
// JWT

// MODELS
const Usuario = require('../models/usuario.model');
// MODELS

/** ================================================================
 * GET USERS
====================================================================*/
const getUsuarios = async(req, res = response) => {

    const usuarios = await Usuario.find({}, 'nombre email role ');

    res.json({
        ok: true,
        usuarios
    });
};
/** ================================================================
 * GET USERS
====================================================================*/

/** ================================================================
 * CREATE NEW USER
====================================================================*/

const crearUsuario = async(req, res = response) => {

    const { nombre, email, password } = req.body;

    try {

        const validarEmail = await Usuario.findOne({ email });

        if (validarEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con este correo'
            });
        }

        const usuario = new Usuario(req.body);

        // ENCRYPTAR PASSWORD
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // SAVE USER
        await usuario.save();

        // GENERAR TOKEN
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


};
/** ================================================================
 * CREATE NEW USER
====================================================================*/

/** ================================================================
 * PUT USER - ACTUALIZAR USUARIO
====================================================================*/
const actualizarUsuario = async(req, res = response) => {

    // TODO: Validar Token y comprobar el usuario

    const uidT = req.uid;

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con este id'
            });
        }

        if (uidT != uid) {

            return res.status(403).json({
                ok: false,
                msg: 'No estas autorizado para cambiar información de otros usuarios, esto aplica acciones legales'
            });
        }

        // Actualizaciones
        const { password, ...campos } = req.body;

        // if (usuarioDB.email != email) {

        //     const validarEmail = await Usuario.findOne({ email });
        //     if (validarEmail) {

        //         return res.status(400).json({
        //             ok: false,
        //             msg: 'Ya existe un usuario con este email.'
        //         });

        //     }
        // }

        // campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


};
/** ================================================================
 * PUT USER - ACTUALIZAR USUARIO
====================================================================*/
/** ================================================================
 * DELETE - BORRAR USUARIO
====================================================================*/
const borrarUsuario = async(req, res = response) => {

    // TODO: Validar Token y comprobar el usuario
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con este id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminiado'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });

    }


}

/** ================================================================
 * DELETE - BORRAR USUARIO
====================================================================*/



// MODULE EXPORTS
module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}