const { response } = require('express');

// MODELS
const Categoria = require('../models/categorias.model');
// MODELS

/** ================================================================
 * GET CATEGORIAS
====================================================================*/
const getCategorias = async(req, res = response) => {

    const categorias = await Categoria.find()
        .populate('usuario', 'nombre email');


    res.json({
        ok: true,
        categorias
    });
};
/** ================================================================
 * GET CATEGORIAS
====================================================================*/
/** ================================================================
 * CREATE NEW CATEGORIA
====================================================================*/

const crearCategoria = async(req, res = response) => {

    const uid = req.uid;
    const nombre = req.body.nombre;

    const categoria = new Categoria({
        usuario: uid,
        ...req.body
    });

    try {

        const validarCategoria = await Categoria.findOne({ nombre });

        if (validarCategoria) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una categoria con este nombre'
            });
        }

        // SAVE USER
        const categoriaDB = await categoria.save();

        res.json({
            ok: true,
            categoria: categoriaDB
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
 * CREATE NEW CATEGORIA
====================================================================*/
/** ================================================================
 * PUT CATEGORIA - ACTUALIZAR CATEGORIA
====================================================================*/
const actualizarCategoria = async(req, res = response) => {

    // TODO: Validar Token y comprobar el usuario

    const id = req.params.id;

    try {

        const categoriaDB = await Categoria.findById(id);

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una categoria con este id'
            });
        }

        // Actualizaciones
        const { nombre, ...campos } = req.body;

        if (categoriaDB.nombre != nombre) {

            const validarCategoria = await Categoria.findOne({ nombre });
            if (validarCategoria) {

                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una categoria con este nombre.'
                });

            }
        }

        campos.nombre = nombre;

        const categoriaActualizada = await Categoria.findByIdAndUpdate(id, campos, { new: true });

        res.json({
            ok: true,
            categoriaActualizada
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
 * PUT CATEGORIA - ACTUALIZAR CATEGORIA
====================================================================*/
/** ================================================================
 * DELETE - BORRAR CATEGORIA
====================================================================*/
const borrarCategoria = async(req, res = response) => {

    // TODO: Validar Token y comprobar el usuario
    const id = req.params.id;

    try {

        const categoriaDB = await Categoria.findById(id);

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una categoria con este id'
            });
        }

        if (categoriaDB.estado == true) {
            estado = false;
        } else {
            estado = true;
        }

        const categoriaActualizada = await Categoria.findByIdAndUpdate(id, { estado }, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            categoria: categoriaActualizada
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
 * DELETE - BORRAR CATEGORIA
====================================================================*/


// MODULE EXPORTS
module.exports = {
    getCategorias,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}