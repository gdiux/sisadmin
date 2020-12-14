/**
 *  RUTA: /api/productos/
 */
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// MIDDLEWARES

// CONTROLLERS
const { searchCategoria } = require('../controllers/search.controller');
// CONTROLLERS

const router = Router();


/** ================================================================
 * GET PRODUCTO
====================================================================*/
router.get('/:tipo/:busquedad', validarJWT, searchCategoria);
/** ================================================================
 * GET  PRODUCTO
====================================================================*/



// MODULE EXPORTS
module.exports = router;