const { body, validationResult } = require('express-validator');
const arrData = require('../data/database.json'); // JS
const path = require('path');
const fs =  require('fs');
const { hashSync }  = require('bcryptjs')

//DATA - JSON
const pathFile = path.join(__dirname, '..','data','database.json');

const validacionesRegistro = [
    body('name').notEmpty().withMessage('Debes ingresar un nombre').bail()
    .isLength({ min:5, max:15 }).withMessage('Debe al menos 5 carácteres'),
    body('lastname').notEmpty().withMessage('Debes ingresar un apellido'),
    body('email').notEmpty().withMessage('Debes ingresar un email').bail()
    .isEmail().withMessage('Debe ingresar un formato válido'),
    body('password').notEmpty().withMessage('Debes ingresar un password'),
    body('rePassword').notEmpty().withMessage('Debes ingresar un password')
]

const resultadoValidacion = (req, res, next) =>{

    const errors = validationResult(req);

    console.log(errors.mapped())

    console.log('BODY: ', req.body)

    if(errors.isEmpty() === true){ // FALSE: hay errores | TRUE: No hay errores
        // TRUE 
        const newUser = {
            id: `${arrData.length + 1}`,
            ...req.body,
            password: hashSync(req.body.password, 10)
        };

        delete newUser.rePassword

        // Modificamos el arrData pero en JS
        arrData.push(newUser)

        // Data = JSON
        fs.writeFileSync(pathFile, JSON.stringify(arrData))

        next()
      
    }else{

        // FALSE : Hay errores
        res.render('register', {
            errors: errors.mapped(),
            old: req.body
        })
    }

}

module.exports = {
    validacionesRegistro,
    resultadoValidacion
};