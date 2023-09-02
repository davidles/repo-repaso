

const userController = {

    /** LOGIN */
    formLogin: (req, res) => {
        res.render('login')
    },

    login: (req, res) =>{
        res.send('Logueado!')
    },


    /** Registro */
    formRegister: (req, res) =>{
        res.render('register')
    },

    register: (req,  res)  =>{
        res.redirect('/')
    }
}

module.exports = userController;