const { Schema, model } = require('mongoose');

const ClaseSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    maestro: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = model('Clase', ClaseSchema);