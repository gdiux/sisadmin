/**
 *  RUTA: /api/login/
 */
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
// MIDDLEWARES

// CONTROLLERS
const { login } = require('../controllers/auth.controller');

// CONTROLLERS

const router = Router();

/** ================================================================
 * LOGIN USERS
====================================================================*/
router.post(
    '/', [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    login

);
/** ================================================================
 * LOGIN USERS
====================================================================*/



// MODULE EXPORTS
module.exports = router;