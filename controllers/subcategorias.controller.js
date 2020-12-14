const { response } = require('express');


// MODELS
const Subcategoria = require('../models/subcategorias.model');
// MODELS

/** ================================================================
 * GET CATEGORIAS
====================================================================*/
const getSubcategorias = async(req, res = response) => {

    const subcategorias = await Subcategoria.find()
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre');


    res.json({
        ok: true,
        subcategorias
    });
};
/** ================================================================
 * GET CATEGORIAS
====================================================================*/
/** ================================================================
 * CREATE NEW CATEGORIA
====================================================================*/

const crearSubcategoria = async(req, res = response) => {

    const uid = req.uid;

    const { nombre } = req.body;

    const subcategoria = new Subcategoria({
        usuario: uid,
        ...req.body
    });

    try {

        const validarSubcategoria = await Subcategoria.findOne({ nombre });

        if (validarSubcategoria) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una subcategoria con este nombre'
            });
        }

        // SAVE SUBCATEGORIA
        const subcategoriaDB = await subcategoria.save();

        res.json({
            ok: true,
            subcategoria: subcategoriaDB
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
 * PUT SUBCATEGORIA - ACTUALIZAR SUBCATEGORIA
====================================================================*/
const actualizarSubcategoria = async(req, res = response) => {

    // TODO: Validar Token y comprobar el usuario
    const id = req.params.id;

    try {

        const subcategoriaDB = await Subcategoria.findById(id);

        if (!subcategoriaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una categoria con este id'
            });
        }

        // Actualizaciones
        const { nombre, ...campos } = req.body;

        if (subcategoriaDB.nombre != nombre) {

            const validarSubcategoria = await Subcategoria.findOne({ nombre });
            if (validarSubcategoria) {

                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una subcategoria con este nombre.'
                });

            }
        }

        campos.nombre = nombre;

        const subcategoriaActualizada = await Subcategoria.findByIdAndUpdate(id, campos, { new: true });

        res.json({
            ok: true,
            subcategoriaActualizada
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
 * PUT SUBCATEGORIA - ACTUALIZAR SUBCATEGORIA
====================================================================*/
/** ================================================================
 * DELETE - BORRAR CATEGORIA
====================================================================*/
const borrarSubcategoria = async(req, res = response) => {

    // TODO: Validar Token y comprobar el usuario
    const id = req.params.id;

    try {

        const subcategoriaDB = await Subcategoria.findById(id);

        if (!subcategoriaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una subcategoria con este id'
            });
        }

        if (subcategoriaDB.estado == true) {
            estado = false;
        } else {
            estado = true;
        }

        const subcategoriaActualizada = await Subcategoria.findByIdAndUpdate(id, { estado }, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            categoria: subcategoriaActualizada
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
    getSubcategorias,
    crearSubcategoria,
    actualizarSubcategoria,
    borrarSubcategoria
}