/**
 *  RUTA: /api/usuarios/
 */
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// MIDDLEWARES

// CONTROLLERS
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuario.controller');
// CONTROLLERS


const router = Router();
/** ================================================================
 * GET USERS
====================================================================*/
router.get('/', validarJWT, getUsuarios);
/** ================================================================
 * GET USERS
====================================================================*/

/** ================================================================
 * POST CREATE NEW USER
====================================================================*/
router.post(
    '/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario
);
/** ================================================================
 * POST CREATE NEW USER
====================================================================*/
/** ================================================================
 * PUT USER
====================================================================*/
router.put(
    '/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);
/** ================================================================
 * PUT USER
====================================================================*/
/** ================================================================
 * DELETE USERS
====================================================================*/
router.delete(
    '/:id',
    validarJWT,
    borrarUsuario
);
/** ================================================================
 * DELETE USERS
====================================================================*/


// MODULE EXPORTS
module.exports = router;