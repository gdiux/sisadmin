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
const { crearSubcategoria, getSubcategorias, actualizarSubcategoria, borrarSubcategoria } = require('../controllers/subcategorias.controller');
// CONTROLLERS

const router = Router();

/** ================================================================
 * POST CREATE NEW SUBCATEGORIA
====================================================================*/
router.post(
    '/', [
        validarJWT,
        check('nombre', 'El nombre de la subcategoria es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearSubcategoria
);
/** ================================================================
 * POST CREATE NEW SUBCATEGORIA
====================================================================*/
/** ================================================================
 * GET SUBCATEGORIAS
====================================================================*/
router.get('/', validarJWT, getSubcategorias);
/** ================================================================
 * GET SUBCATEGORIAS
====================================================================*/
/** ================================================================
 * PUT SUBCATEGORIA
====================================================================*/
router.put(
    '/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarSubcategoria
);
/** ================================================================
 * PUT SUBCATEGORIA
====================================================================*/
/** ================================================================
 * DELETE SUBCATEGORIA
====================================================================*/
router.delete(
    '/:id',
    validarJWT,
    borrarSubcategoria
);
/** ================================================================
 * DELETE SUBCATEGORIA
====================================================================*/


// MODULE EXPORTS
module.exports = router;