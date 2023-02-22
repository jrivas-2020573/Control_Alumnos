const { response, request } = require('express');
const { body } = require('express-validator');


const Asignacion = require('../models/asignaciones');

const getAsignacionesDeUsuario = async(req = request, res = response) => {
    const {id} = req.params;
    const asignacion = await Asignacion.findById(id)
    .populate('usuario', "nombre")
    .populate('curso1', "nombre")
    .populate('curso2', "nombre")
    .populate('curso3', "nombre")

    res.json({
        asignacion
    })
}
// const agregarAsignacion = async( req = request, res = response) => {
//     const {...body} = req.body;

//     const asignacionEnDB = await Asignacion.findOne({nombre: body.nombre});

//     if (asignacionEnDB) {
//         return res.status(400).json({
//             msg: `La asignacion ${asignacionEnDB.nombre} ya existe en la DB`
//         });
//     }

//     const data = {
//         ...body
//     }

//     const asignacion = new Asignacion(data);

//     await asignacion.save();

//     res.status(200).json({
//         asignacion
//     })
// }

const postAsignacion = async(req = request, res = response) => {

    const {usuario, ...body} = req.body;

    const asignacionDB = await Asignacion.findOne({usuario: body.usuario});

    if (asignacionDB) {
        return res.status(400).json({
            msg: `El usuario ${asignacionDB.usuario} ya esta asignado a su curso`
        })
    }
    const data = {
        ...body,
        usuario: req.usuario._id
    }

    const asignacion = new Asignacion(data)

    await asignacion.save();

    res.status(201).json({
        asignacion
    })
}

const putAsignacion = async( req = request, res = response) => {
    const {id} = req.params;

    const {_id, usuario, ...data} = req.body;

    if(data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id

    const editarAsignacion = await Asignacion.findByIdAndUpdate(id, data, {new: true});

    res.json({
        editarAsignacion
    })
}

const deleteAsignacion = async(req = request, res = response) => {

    const {id} = req.params;

    const asignacionborrar = await Asignacion.findByIdAndDelete(id);

    res.json({
        asignacionborrar
    })
}



module.exports = {
    postAsignacion,
    getAsignacionesDeUsuario,
    putAsignacion,
    deleteAsignacion
}