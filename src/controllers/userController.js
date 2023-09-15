const { body, validationResult } = require('express-validator');
const arrData = require('../data/database.json'); // JS
const path = require('path');
const fs =  require('fs');
const { hashSync, compare, compareSync }  = require('bcryptjs');
const pathFile = path.join(__dirname, '..','data','database.json');


const userController = {

    /** LOGIN */
    formLogin: (req, res) => {
        res.render('login')
    },

    login: (req, res) =>{
        const findUser = arrData.find(({email}) => email === req.body.email);

        if(findUser && compareSync(req.body.password, findUser.password)){
            req.session.userLogged = findUser;

            res.cookie('email', findUser.email, { maxAge: ((1000 * 60) * 60) * 5 })

            res.redirect('/user/profile')

        }else{
            res.render('login')
        }

    },


    /** Registro */
    formRegister: (req, res) =>{
        res.render('register')
    },

    register: (req,  res)  =>{
        const errors = validationResult(req);

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
            fs.writeFileSync(pathFile, JSON.stringify(arrData, null, "  "));

            res.redirect('/user/login')
    
          
        }else{
    
            // FALSE : Hay errores
            res.render('register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

    profile: (req, res) =>{
        res.render('profile', {
            user: req.session.userLogged 
        })
    },

    logout: ( req, res ) =>{
        res.clearCookie('email')
        req.session.destroy();

        res.redirect('/')
    }
}

module.exports = userController  ;