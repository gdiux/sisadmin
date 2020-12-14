/**
 *  RUTA: /api/productos/
 */
const { Router } = require('express');
const { check } = require('express-validator');
const fileUpload = require('express-fileupload');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// MIDDLEWARES

// CONTROLLERS
const { crearProducto, getProductos, actualizarProducto, borrarProducto, getImagen } = require('../controllers/productos.controller');
// CONTROLLERS

const router = Router();

router.use(fileUpload());

/** ================================================================
 * POST CREATE NEW PRODUCTO 
====================================================================*/
router.post(
    '/', [
        validarJWT,
        check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion del producto es obligatorio').not().isEmpty(),
        check('precio', 'El precio del producto es obligatorio').not().isEmpty(),
        check('marca', 'La marca del producto es obligatoria').not().isEmpty(),
        check('porcentaje', 'El porcentaje del producto es obligatorio').not().isEmpty(),
        check('oferta', 'La oferta del producto es obligatoria').not().isEmpty(),
        check('categoria', 'La categoria del producto es obligatorio').not().isEmpty(),
        check('subcategoria', 'La subcategoria del subcategoria es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearProducto
);
/** ================================================================
 * POST CREATE NEW PRODUCTO
====================================================================*/
/** ================================================================
 * GET PRODUCTO
====================================================================*/
router.get('/', validarJWT, getProductos);
/** ================================================================
 * GET  PRODUCTO
====================================================================*/
/** ================================================================
 * GET IMAGEN DEL PRODUCTO
====================================================================*/
router.get('/:carpeta/:nombre', getImagen);
/** ================================================================
 * GET  IMAGEN DEL PRODUCTO
====================================================================*/
/** ================================================================
 * PUT PRODUCTO
====================================================================*/
router.put(
    '/:id', [
        validarJWT,
        check('codigo', 'El codigo del producto es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion del producto es obligatorio').not().isEmpty(),
        check('precio', 'El precio del producto es obligatorio').not().isEmpty(),
        check('marca', 'La marca del producto es obligatoria').not().isEmpty(),
        check('porcentaje', 'El porcentaje del producto es obligatorio').not().isEmpty(),
        check('oferta', 'La oferta del producto es obligatoria').not().isEmpty(),
        check('categoria', 'La categoria del producto es obligatorio').not().isEmpty(),
        check('subcategoria', 'La subcategoria del subcategoria es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarProducto
);
/** ================================================================
 * PUT PRODUCTO
====================================================================*/
/** ================================================================
 * DELETE PRODUCTO
====================================================================*/
router.delete(
    '/:id',
    validarJWT,
    borrarProducto
);
/** ================================================================
 * DELETE PRODUCTO
====================================================================*/


// MODULE EXPORTS
module.exports = router;