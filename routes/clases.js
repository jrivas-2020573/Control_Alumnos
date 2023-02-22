const { Router } = require('express');
const { check } = require('express-validator');
const { getClases, agregarClase, editarClase, eliminarClase } = require('../controllers/clases');
const { existeClasePorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esMaestro } = require('../middlewares/validar-roles');

const router = Router();


router.get('/', getClases);

router.post('/agregar',[
    validarJWT,
    esMaestro,
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    validarCampos
], agregarClase);

router.put('/editar/:id', [
    validarJWT,
    esMaestro,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeClasePorId),
    check('nombre', 'El nombre de la categoria es obligatoria').not().isEmpty(),
    validarCampos
], editarClase);

router.delete('/eliminar/:id',[
    validarJWT,
    esMaestro,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeClasePorId),
    validarCampos
], eliminarClase);

module.exports = router;