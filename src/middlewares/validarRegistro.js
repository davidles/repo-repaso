const { body } = require('express-validator');


const validacionesRegistro = [
    body('name').notEmpty().withMessage('Debes ingresar un nombre').bail()
    .isLength({ min:3, max:15 }).withMessage('Debe al menos 5 carácteres'),
    body('lastname').notEmpty().withMessage('Debes ingresar un apellido'),
    body('email').notEmpty().withMessage('Debes ingresar un email').bail()
    .isEmail().withMessage('Debe ingresar un formato válido'),
    body('password').notEmpty().withMessage('Debes ingresar un password'),
    body('rePassword').notEmpty().withMessage('Debes ingresar un password').bail()
    .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Las contraseñas no coinciden');
        }
        return true;
      }),
]


module.exports = validacionesRegistro;