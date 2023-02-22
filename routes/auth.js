const { Router } = require('express');
const { check } = require('express-validator');
const { Login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos
] ,Login);



module.exports = router;