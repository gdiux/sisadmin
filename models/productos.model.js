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

    inicial:{
        type: Number,
        default: 0
    },

    vendidos: {
        type: Number,
        default: 0
    },

    devueltos:{
        type: Number,
        default: 0
    },

    stock: {
        type: Number,
        default: 0
    },

    likes: {
        type: Number,
        default: 0
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