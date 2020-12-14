/**
 *  RUTA: /api/categorias/
 */
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// MIDDLEWARES

// CONTROLLERS
const { crearCategoria, getCategorias, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');
// CONTROLLERS

const router = Router();

/** ================================================================
 * POST CREATE NEW CATEGORIA
====================================================================*/
router.post(
    '/', [
        validarJWT,
        check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearCategoria
);
/** ================================================================
 * POST CREATE NEW CATEGORIA
====================================================================*/
/** ================================================================
 * GET CATEGORIAS
====================================================================*/
router.get('/', validarJWT, getCategorias);
/** ================================================================
 * GET CATEGORIAS
====================================================================*/
/** ================================================================
 * PUT USER
====================================================================*/
router.put(
    '/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarCategoria
);
/** ================================================================
 * PUT USER
====================================================================*/
/** ================================================================
 * DELETE CATEGORIA
====================================================================*/
router.delete(
    '/:id',
    validarJWT,
    borrarCategoria
);
/** ================================================================
 * DELETE CATEGORIA
====================================================================*/


// MODULE EXPORTS
module.exports = router;