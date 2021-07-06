const { response } = require('express');
const bcrypt = require('bcryptjs');

// JWT
const { generarJWT } = require("../helpers/jwt");
// JWT

// MODELS
const Client = require('../models/clients.model');
// MODELS

/** ================================================================
 * GET CLIENTS
====================================================================*/
const getClients = async(req, res = response) => {

    try {

        const usuarios = await Client.find({}, 'name email name email cedula phone address city department status')
                                .populate('cart.productos', 'name');

        res.json({
            ok: true,
            usuarios
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
 * GET CLIENTS
====================================================================*/

/** ================================================================
 * POST CLIENTS
====================================================================*/
const postClients = async(req, res = response) => {

    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}
/** ================================================================
 * POST CLIENTS
====================================================================*/

/** ================================================================
 * PUT CLIENT
====================================================================*/
const updateClients = async(req, res = response) => {

    // TODO: Validar Token y comprobar el usuario

    const uidT = req.uid;
    const cid = req.params.id;

    try {

        const clientDB = await Client.findById(cid);

        if (!clientDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con este id'
            });
        }

        if (uidT != cid) {

            return res.status(403).json({
                ok: false,
                msg: 'No estas autorizado para cambiar información de otros usuarios, esto aplica acciones legales'
            });
        }

        // Actualizaciones
        const { password, ...campos } = req.body;

        // if (clientDB.email != email) {

        //     const validarEmail = await Usuario.findOne({ email });
        //     if (validarEmail) {

        //         return res.status(400).json({
        //             ok: false,
        //             msg: 'Ya existe un usuario con este email.'
        //         });

        //     }
        // }

        // campos.email = email;

        const clienteActualizado = await Client.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            clienteActualizado
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
 * PUT CLIENT
====================================================================*/



// EXPORT
module.exports = {
    getClients,
    postClients,
    updateClients
}