const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos=require('../models/Proyectos');
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
            notEmpty:{
                msg: 'email must a valid string'
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
            notEmpty:{
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

Usuarios.hasMany(Proyectos); //user can has many projects

module.exports = Usuarios;

//hash paswords
/* 
npm install --save bcrypt-nodejs

*/
//valid comment

