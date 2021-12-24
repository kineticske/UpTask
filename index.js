const express = require('express');
const routes = require('./routes'); //routes
const path = require('path'); //The path module provides utilities for working with file and directory paths. 
const bodyParser=require('body-parser');
const expressValidator = require('express-validator'); //express validator
const helper = require('./helper');
const flash = require('connect-flash');
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

//bodyParser
app.use(bodyParser.urlencoded({extended: true})); //for forms 

app.set('view engine', 'pug');

app.use(express.static('public')); //static files

app.set('views', path.join(__dirname, 'views')); //views

app.use(flash()); //

//using helper's modules
app.use((req, res, next) => {
    res.locals.var_dump = helper.var_dump;
    next();
})

// app.use(expressValidator());

app.use('/', routes());

app.listen(7000);