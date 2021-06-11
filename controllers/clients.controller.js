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



// EXPORT
module.exports = {
    getClients
}