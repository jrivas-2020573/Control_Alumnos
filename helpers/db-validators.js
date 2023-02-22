const Usuario = require('../models/usuario');
const Role = require('../models/role');
const Clase = require('../models/clases');
const Asignacion = require('../models/asignaciones');


//Validamos en contro de la db si ese correo ya existe
const emailExiste = async( correo = '' ) => {
    //Verficar si el correo existe
    const existeEmailDeUsuario = await Usuario.findOne( { correo } );
    if ( existeEmailDeUsuario) {
        throw new Error(`El correo ${ correo }, ya esta registrado en la DB `);
    }
}

const cursoAsignado = async (curso = '') => {
    const cursoYaAsignado = await Asignacion.findOne({curso});
    if(cursoYaAsignado){
        throw new Error(`El curso ${curso}, ya esta asignado a este usuario`);
    }
}

const esRoleValido = async( rol = '') => {
    //Verificar si el rol es valido y existe en la DB
    if (rol != "") {
        const existeRolDB = await Role.findOne( { rol } );
        if ( !existeRolDB ) {
            throw new Error(`El rol ${ rol }, no existe en la DB `);
        }
    }
}


const existeUsuarioPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfUser = await Usuario.findById( id );
    if ( !existIdOfUser ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

const existeClasePorId = async(id) => {
    const existIdOfClass = await  Clase.findById(id);
    if (!existIdOfClass) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }
}

module.exports = {
    emailExiste,
    esRoleValido,
    existeUsuarioPorId,
    existeClasePorId,
    cursoAsignado
}