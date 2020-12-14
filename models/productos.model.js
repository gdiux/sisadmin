const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

    codigo: {
        type: String,
    },

    nombre: {
        type: String,
        require: true
    },

    descripcion: {
        type: String,
        require: true
    },

    marca: {
        type: String,
        require: true
    },

    modelo: {
        type: String
    },

    año: {
        type: String
    },

    precio: {
        type: Number,
        require: true
    },

    porcentaje: {
        type: Number,
        require: true
    },

    oferta: {
        type: Number,
        require: true
    },

    ventas: {
        type: Number,
        default: 0
    },

    likes: {
        type: Number,
        default: 0
    },

    ciudad: {
        type: String,
        require: true,
    },

    estado: {
        type: String,
        require: true,
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },

    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },

    subcategoria: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategoria',
        require: true
    },

    img: {
        type: String,
        require: true
    },

    status: {
        type: Boolean,
        default: true
    },

    fecha: {
        type: Date,
        default: Date.now
    }

});

module.exports = model('Producto', ProductoSchema);