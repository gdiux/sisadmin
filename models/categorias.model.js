const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({

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

    estado: {
        type: Boolean,
        default: true
    }

});

module.exports = model('Categoria', CategoriaSchema);