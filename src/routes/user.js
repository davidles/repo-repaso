const express  =   require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/userController');

// Middlewares
const  validacionesRegistro  = require('../middlewares/validarRegistro')

/*** LOGIN */
router.get('/login', userController.formLogin);
router.post('/login', userController.login);


/*** Register */
router.get('/register',  userController.formRegister);
router.post('/register', validacionesRegistro, userController.register);

router.get('/profile',  userController.profile);

router.post('/profile',  userController.logout);




module.exports  = router;