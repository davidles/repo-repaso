const express  =   require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/userController');

// Middlewares
const { validacionesRegistro, resultadoValidacion } = require('../middlewares/validarRegistro')

/*** LOGIN */
router.get('/login', userController.formLogin);
router.post('/login', userController.login);


/*** Register */
router.get('/register',  userController.formRegister);
router.post('/register', validacionesRegistro, resultadoValidacion,userController.register);


module.exports  = router;