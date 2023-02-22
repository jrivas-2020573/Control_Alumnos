const { Router } = require('express');
const { check } = require('express-validator');
const { postAsignacion, getAsignacionesDeUsuario, putAsignacion, deleteAsignacion } = require('../controllers/asignaciones');
const { cursoAsignado } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esMaestro } = require('../middlewares/validar-roles');


const router = Router();

router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    validarCampos
] ,getAsignacionesDeUsuario);

router.post('/agregar',[
    validarJWT,
    check('curso').custom( cursoAsignado ),
    validarCampos
] ,postAsignacion);

router.put('/editar/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], putAsignacion);

router.delete('/eliminar/:id',[
    validarJWT,
    esMaestro,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], deleteAsignacion);


module.exports = router;