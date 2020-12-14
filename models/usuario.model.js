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

    telefono: {
        type: String,
    },

    whatsapp: {
        type: String
    },

    role: {
        type: String,
        default: 'USER_ROLE'
    },

    google: {
        type: Boolean,
        default: false
    },

    facebook: {
        type: Boolean,
        default: false
    },

    direccion: {
        type: String
    },

    ciudad: {
        type: String
    },

    estado: {
        type: String
    },

    puntos: {
        type: Number,
        default: 0
    },

    likes: {
        type: Number,
        default: 0
    },

    status: {
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