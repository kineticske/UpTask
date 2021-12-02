//create another table in the database 'uptasknode'

const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos=require('./Proyectos');

const Tareas = db.define('tareas', {
    id:{
        type:Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true

    }, 
    tareas: Sequelize.STRING(100),
    estado: Sequelize.INTEGER(1)
});

Tareas.belongsTo(Proyectos) //each task belongs to Proyect



module.exports= Tareas; //to general index