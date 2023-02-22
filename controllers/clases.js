const { response, request } = require('express');
const { body } = require('express-validator');

const Clase = require('../models/clases');

const getClases = async(req = request, res = response) => {
    const listaClases = await Promise.all([
        Clase.countDocuments(),
        Clase.find()
    ]);

    res.json({
        msg: 'GET API de clases',
        listaClases
    });
}


const agregarClase = async(req = request, res = response) => {

    const {maestro, ...body } = req.body;       
    const claseDB = await Clase.findOne({nombre: body.nombre});
    if (claseDB) {
        return res.status(400).json({
            msg: `La clase ${claseDB.nombre} ya existe en la DB`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        maestro: req.usuario._id
        

    }

    const ClaseAgregada = new Clase(data);

    await ClaseAgregada.save();

    res.status(201).json({
        msg: 'Post Clase',
        ClaseAgregada
    });
}

const editarClase = async( req = request, res = response) => {
    const {id} = req.params;
    const {_id, ...Data} = req.body;

    if (Data.nombre) {
        Data.nombre = Data.nombre.toUpperCase();
    }

    

    const clase = await Clase.findByIdAndUpdate(id, Data, {new: true});

    res.json({
        msg: 'Put categoria',
        clase
    });
}

const eliminarClase = async( req = request, res = response) => {
    const {id} = req.params;

    const claseEliminada = await Clase.findByIdAndRemove(id);

    res.json({
        msg: 'Delete Categoria',
        claseEliminada
    });
}

module.exports = {
    getClases,
    agregarClase,
    editarClase,
    eliminarClase
}
