const { Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario,revalidarToken } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const validarToken = require('../middlewares/validar-token.middleware');


const router = Router();

// Crear un nuevo usuario
router.post('/new',[
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener 6 caracteres').isLength(6),
    validarCampos
], crearUsuario);


//Login usuarios
router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener 6 caracteres').isLength(6),
    validarCampos
],loginUsuario);

//Validador token
router.get('/renew', [
    validarToken
],revalidarToken);





module.exports  = router;