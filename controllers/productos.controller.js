const { response } = require('express');

const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

const webp = require('webp-converter');
webp.grant_permission();

// MODELS
const Producto = require('../models/productos.model');

const Usuario = require('../models/usuario.model');
// MODELS

/** ================================================================
 * GET IMAGENES DE LOS PRODUCTOS 
====================================================================*/
const getImagen = async(req, res = response) => {

    const carpeta = req.params.carpeta;
    const nombre = req.params.nombre;

    const pathImg = path.join(__dirname, `../assets/img/${carpeta}/${nombre}`);

    if (fs.existsSync(pathImg)) {

        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../assets/img/${carpeta}/default.webp`);
        res.sendFile(pathImg);
    }

};
/** ================================================================
 * GET IMAGENES DE LOS PRODUCTOS
====================================================================*/
/** ================================================================
 * GET PRODUCTOS
====================================================================*/
const getProductos = async(req, res = response) => {

    const productos = await Producto.find()
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .populate('subcategoria', 'nombre');


    res.json({
        ok: true,
        productos
    });
};
/** ================================================================
 * GET PRODUCTOS
====================================================================*/
/** ================================================================
 * CREATE NEW PRODUCTS
====================================================================*/

const crearProducto = async(req, res = response) => {

    const uid = req.uid;

    // VALIDAR SI VIENE UNA IMAGEN
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No ha seleccionado ninguna imagen'
        });
    }
    // VALIDAR SI VIENE UNA IMAGEN

    // PROCESAR IMAGEN 
    const file = req.files.img;

    const nombreCortado = file.name.split('.');

    const extencionArchivo = nombreCortado[nombreCortado.length - 1];

    // VALIDAR EXTENCION
    const extensionesValidas = ['jpg', 'png', 'jpeg', 'webp'];
    if (!extensionesValidas.includes(extencionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No se permite este tipo de imagen, solo extenciones JPG - PNG - WEBP'
        });
    }
    // VALIDAR EXTENCION

    // GENERAR NOMBRE DE LA IMAGEN
    const nombreTemporal = uuidv4();
    const nombreArchivo = `${nombreTemporal}.${extencionArchivo}`;
    // GENERAR NOMBRE DE LA IMAGEN

    // PATH PARA GUARDAR LA IMAGEN
    const path = `./assets/img/productos/${nombreArchivo}`;
    // PATH PARA GUARDAR LA IMAGEN

    // MOVER IMAGEN A LA CARPETA
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al guardar la imagen'
            });
        }

        // SI NO ES UNA IMAGEN WEBP
        if (extencionArchivo === 'webp') {

            nameArchivo = nombreArchivo;

        } else {

            const result = webp.cwebp(path, `./assets/img/productos/${nombreTemporal}.webp`, '-q 80');
            result.then((resp) => {
                if (resp) {
                    // BORRAMOS LA IMAGEN TEMPORAL
                    if (fs.existsSync(path)) {
                        fs.unlinkSync(path);
                    }
                    // BORRAMOS LA IMAGEN TEMPORAL
                }
            });

            nameArchivo = `${nombreTemporal}.webp`;
        }
        // SI NO ES UNA IMAGEN WEBP      

    });
    // MOVER IMAGEN A LA CARPETA

    // PROCESAR IMAGEN

    const usuarioDB = await Usuario.findById(uid);

    const producto = new Producto({
        usuario: uid,
        ciudad: usuarioDB.ciudad,
        estado: usuarioDB.estado,
        img: nameArchivo,
        ...req.body
    });

    try {

        // SAVE PRODUCT
        const productoDB = await producto.save();

        res.json({
            ok: true,
            producto: productoDB
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
 * CREATE NEW PRODUCTS
====================================================================*/
/** ================================================================
 * PUT PRODUCTO - ACTUALIZAR PRODUCTO
====================================================================*/
const actualizarProducto = async(req, res = response) => {

    // TODO: Validar Token y comprobar el usuario
    const id = req.params.id;

    try {

        const productoDB = await Producto.findById(id);

        if (!productoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un producto con este id'
            });
        }

        // Actualizaciones
        const { codigo, ...campos } = req.body;

        if (productoDB.codigo != codigo) {

            const validarProducto = await Producto.findOne({ codigo });
            if (validarProducto) {

                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un producto con este codigo de barras.'
                });

            }
        }

        campos.codigo = codigo;

        const productoActualizado = await Producto.findByIdAndUpdate(id, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            producto: productoActualizado
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
 * PUT PRODUCTO - ACTUALIZAR PRODUCTO
====================================================================*/
/** ================================================================
 * DELETE - BORRAR PRODUCTO
====================================================================*/
const borrarProducto = async(req, res = response) => {

    // TODO: Validar Token y comprobar el usuario
    const id = req.params.id;

    try {

        const productoDB = await Producto.findById(id);

        if (!productoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un producto con este id'
            });
        }

        if (productoDB.estado == true) {
            estado = false;
        } else {
            estado = true;
        }

        const productoActualizado = await Producto.findByIdAndUpdate(id, { estado }, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            producto: productoActualizado
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
 * DELETE - BORRAR PRODUCTO
====================================================================*/


// MODULE EXPORTS
module.exports = {
    crearProducto,
    getProductos,
    actualizarProducto,
    borrarProducto,
    getImagen
};