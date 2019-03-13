'use strict'
//ASSINATURA DO TOKEN 
global.SALT_KEY = 'CobomSP+Hackathon';

//Configurações do banco de dados.
module.exports = {
    database: "cobom",
    username: "postgres",
    password: "Santiago",
    host: 'localhost',
    dialect: 'postgres',
    timezone: "-03:00"
};