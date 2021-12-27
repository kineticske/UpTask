const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

//reference to model for oauth
const Usuarios = require('../models/Usuarios')

//local strategy - user (email) and password
passport.use(
    new LocalStrategy(
        //by default passport waits email & password
        {
            usernameField: 'email',
            passwordField: 'password' //equals models
        },

        async(email, password, done) => {
            try {
                const Usuarios = await Usuarios.find({
                    where: {email: email}
                })

                //User exists, password incorrect
                if(!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'Incorrect Password',
                    })
                }

                //user (email) exists and password correct

                return done(null, usuario);
            }
            catch(error){
                //This user doesn't exist
                return done(null, false, {
                    message: 'This account does not exist'
                })

            }
        }
    )
)


//serialize user
passport.serializeUser((usuario, callback)=>{
    callback(null, usuario)
})
//des serialize
passport.deserializeUser((usuario, callback)=>{
    callback(null, usuario)
})

//export

module.exports=passport