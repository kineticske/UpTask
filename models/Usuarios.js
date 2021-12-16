const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos=require('./Proyectos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios= db.define('usuarios',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{
            isEmail:{
                msg: 'Please enter a valid email' //only false
            },
            noEmpty:{
                msg: 'Password must a valid string'
            }
        },
        unique:{
            args: true,
            msg: 'User already exists'
        }
    },
    password:{
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            noEmpty:{
                msg: 'Password must a valid string'
            }
        }
    }
},{
    hooks: {
        beforeCreate(usuario){ //it received that the user send before insert into to the database 
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
}
)

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;

//hash paswords
/* 
npm install --save bcrypt-nodejs

*/