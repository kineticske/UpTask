const passport = require('passport');

exports.authUser = passport.authenticate('local', {
    successRedirect :'/', 
    failureRedirect: 'iniciar-sesion'
}) //(ESTRATEGY_NAME, )