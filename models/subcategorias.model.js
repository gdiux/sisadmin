const { Schema, model } = require('mongoose');

const SubcategoriaSchema = Schema({

    nombre: {
        type: String,
        require: true,
        unique: true
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

    estado: {
        type: Boolean,
        default: true
    }

});

module.exports = model('Subcategoria', SubcategoriaSchema);