const Sequelize = require('sequelize');
const db = require('../config/db');
const slug= require('slug')

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
        beforeCreate(proyecto){
            const url = slug(nombre).toLowerCase;
            proyecto.url=url;
        }
    }
}
);

module.exports =Proyectos;