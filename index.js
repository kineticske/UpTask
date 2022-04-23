const express = require('express');
const routes = require('./routes'); //routes
const path = require('path'); //The path module provides utilities for working with file and directory paths. 
const bodyParser=require('body-parser'); //read data of formulary (it's necessary)
const expressValidator = require('express-validator'); //express validator (sanitizar)
const helper = require('./helper');
const flash = require('connect-flash');
const session=require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport')
//connection to DB
const db = require('./config/db'); //import db
//import model

require('./models/Proyectos'); //proyect model
require('./models/Tareas'); //task model
require('./models/Usuarios'); //Users model

db.sync() // This creates the table if it doesn't exist (and does nothing if it already exists), return a promise
    .then(()=> {console.log('conectado')})
    .catch((err)=>{console.log(err)})

const app = express();

app.use(express.static('public')); //static files

app.set('view engine', 'pug');

//bodyParser
app.use(bodyParser.urlencoded({extended: true})); //for forms 

app.set('views', path.join(__dirname, 'views')); //views

app.use(flash()); //

app.use(cookieParser())

//sesions in distint pages 
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

//using helper's modules and flash  (local variables)
app.use((req, res, next) => {
    res.locals.var_dump = helper.var_dump;
    res.locals.messages=req.flash()
    next();
})

// app.use(expressValidator());

app.use('/', routes());

app.listen(7000);