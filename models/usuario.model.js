const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    },

    cedula: {
        type: String
    },

    role: {
        type: String,
        default: 'USER_ROLE'
    },

    direccion: {
        type: String

    },

    estado: {
        type: Boolean,
        default: true
    }

});

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);