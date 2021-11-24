const  Sequelize = require('sequelize');

const db = new Sequelize('UptaskNode', 'root', 'root', { // sequelize (Name DB, user, password)
    host: 'localhost',
    dialect: 'mysql', // | 'otherDB'
    port: '3306',
    operatorsAliases: false, 
    define: {timestamps: false } ,
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
}
}
);

module.exports =db;