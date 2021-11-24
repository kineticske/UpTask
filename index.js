const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser=require('body-parser');

//connection to DB

const db = require('./config/db');
//import model

require('./models/Proyectos');

db.sync() // This creates the table if it doesn't exist (and does nothing if it already exists), return a promise
    .then(()=> {console.log('conectado')})
    .catch((err)=>{console.log(err)})

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public')); //static files

app.set('views', path.join(__dirname, 'views'));

//bodyParser
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());

app.listen(7000);