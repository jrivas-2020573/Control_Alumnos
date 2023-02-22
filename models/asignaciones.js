const { Schema, model } = require('mongoose');

const AsignacionShema = Schema({
    curso1: {
        type:Schema.Types.ObjectId,
        ref: 'Clase',
        required: true
    },
    curso2: {
        type:Schema.Types.ObjectId,
        ref: 'Clase',
        required: true
    },
    curso3: {
        type:Schema.Types.ObjectId,
        ref: 'Clase',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = model('Asignacion', AsignacionShema);