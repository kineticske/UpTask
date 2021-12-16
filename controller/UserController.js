const Usuarios = require('../models/Usuarios') //import user model

exports.formcreateAccount = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en UpTask'
    } )
}

exports.createAccount = (req, res, next) => {
    console.log(req.body)
    //read data 
    const {email, password} = req.body
    //create user
    Usuarios.create({
        email,
        password
    }) 
    .then(() => {
        res.redirect('/iniciar-sesion')
    })
}


