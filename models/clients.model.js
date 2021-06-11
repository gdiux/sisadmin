const { Schema, model } = require('mongoose');

// PRODUCTS SCHEMA
const ProductosSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Productos',
        require: true
    },
    qty: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
});

const ClientSchema = Schema({

    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    cedula: {
        type: String
    },

    phone: {
        type: String,
    },

    google: {
        type: Boolean,
        default: false
    },

    facebook: {
        type: Boolean,
        default: false
    },

    address: {
        type: String
    },

    
    city: {
        type: String
    },
    
    department: {
        type: String
    },
    
    cart: {
        type: [ProductosSchema]
    },

    status: {
        type: Boolean,
        default: true
    }

});

ClientSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;
});

module.exports = model('Client', ClientSchema);