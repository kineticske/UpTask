const Usuarios = require('../models/Usuarios') //import user model

exports.formcreateAccount = async (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en UpTask'
    } )
}

exports.createAccount = async (req, res, next) => {
    console.log(req.body)
    //read data 
    const {email, password} = req.body

    try{ 
        //create user
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion')

    } catch(err){
        console.log(err);
        req.flash('error', err.errors.map(error => error.message));
        res.render('crearCuenta', {
            nombrePagina: 'Crear cuenta en UpTask',
            errores: req.flash()
        } )
    }

}


