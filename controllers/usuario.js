//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Usuario = require('../models/usuario');


const getUsuarios = async (req = request, res = response) => {
    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find(),
        
    ]);

    res.json({
        msg: 'GET API de usuarios',
        listaUsuarios
    });

}
// const agregarClases = async(req = request, res = response) =>{
//     //Verficar que no hayan cursos repetidos
//     for(let i=0; i < clases.length; i++){
//         if (usuario.clases.includes(clases[i])) {
//             res.status(400).json({
//                 msg: `La clase ${clases[i]} ya esta asignado al usuario`
//             });
//             return;
//         }
//     }

//     //Verificar que el numero maximo de cursos no se pase
//     if(usuario.clases.length + clases.length > 3){
//         res.status(400).json({
//             msg: `El maximo de clases ha sido alcanzado`
//         });
//         return;
//     }

//     //Agregar los cursos al array de clases de alumno
//     usuario.cursos.push(...clases);

//     //Guardar el usuario acutalizado
//     usuario.save((err) =>{
//         if (err) {
//             console.error(err);
//             res.status(500).send({
//                 msg: 'Error interno del server'
//             });
//             return;
//         }
//         res.send({
//             msg: 'Clases agregadas exitosamente'
//         });
//     });
// }




const postUsuario = async (req = request, res = response) => {

    if (req.body.rol == "") {
        req.body.rol = "ROLE_ALUMNO"
    }
    const { nombre, correo, password,rol } = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password,rol });

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await usuarioDB.save();

    res.status(201).json({
        msg: 'POST API de usuario',
        usuarioDB
    });

}

const putUsuario = async (req = request, res = response) => {

    const { id } = req.params;

    //Ignoramos el _id, rol, estado y google al momento de editar y mandar la petición en el req.body
    const { _id, ...resto } = req.body;

    // //Encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    //editar y guardar
    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de usuario',
        usuarioEditado
    });

}


const deleteUsuario = async (req = request, res = response) => {

    const { id } = req.params;

    const usuarioEliminado = await Usuario.findByIdAndDelete(id);


    res.json({
        msg: 'DELETE API de usuario',
        usuarioEliminado
    });

}



module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}