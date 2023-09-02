const path = require('path');

const indexController = {
    renderHome: (req, res) =>{
        res.render('index', {
            title: 'Digital House'
        })
    }
}

module.exports= indexController;