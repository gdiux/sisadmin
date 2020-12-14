const { response } = require('express');


// MODELS
const Producto = require('../models/productos.model');
const Categoria = require('../models/categorias.model');
const Subcategoria = require('../models/subcategorias.model');
// MODELS

/** ================================================================
 * GET CATEGORIAS
====================================================================*/
const searchCategoria = async(req, res = response) => {

    const tipo = req.params.tipo;
    const busquedad = req.params.busquedad;
    const regex = new RegExp(busquedad, 'i');

    let productos = [];

    switch (tipo) {
        case 'categoria':
            const categoria = await Categoria.findOne({ nombre: regex }, 'id');
            productos = await Producto.find({ categoria })
                .populate('usuario', 'nombre email')
                .populate('categoria', 'nombre')
                .populate('subcategoria', 'nombre');
            break;
        case 'subcategoria':
            const subcategoria = await Subcategoria.findOne({ nombre: regex }, 'id');
            productos = await Producto.find({ subcategoria })
                .populate('usuario', 'nombre email')
                .populate('categoria', 'nombre')
                .populate('subcategoria', 'nombre');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'Parametros de busquedas incorrectos, selecciona solo categoria o subcategoria'
            });

    }

    res.json({
        ok: true,
        productos
    });
};
/** ================================================================
 * GET CATEGORIAS
====================================================================*/



// MODULE EXPORTS
module.exports = {
    searchCategoria
}