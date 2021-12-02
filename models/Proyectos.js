const Sequelize = require('sequelize');
const db = require('../config/db');
const slug= require('slug')
const shortid = require('shortid');

const Proyectos = db.define('proyectos', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    nombre :  Sequelize.STRING(100),
    url : Sequelize.STRING(100)
},{
    hooks: {
        beforeCreate(proyectos){ //receives the table as a parameter and assigns to the url the concatenation with whatever the shortid generates.
            const url = slug(proyectos.nombre).toLowerCase(); //create the url 
            proyectos.url=`${url}-${shortid.generate()}`
        }
    }
}
);

// Proyectos.hasMany(Tareas)

module.exports =Proyectos;