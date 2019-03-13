'use strict'

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
let db = null;
module.exports = (app) => {
    const set = app.src.config;
    const sequelize = new Sequelize(
        set.config.database,
        set.config.username,
        set.config.password, {
            dialect: set.config.dialect,
            host: set.config.host,
            logging: false,
            port: 5433
        },
    );
    sequelize.authenticate().then(() => {
        console.log('__________ Conectado ao Banco de Dados __________');
    });
    db = {
        sequelize,
        Sequelize,
        models: {}
    };
    const dir = path.join(__dirname, "../models");
    fs.readdirSync(dir).forEach(file => {
        const modelDir = path.join(dir, file);
        const model = sequelize.import(modelDir);
        db.models[model.name] = model;
    });
    Object.keys(db.models).forEach(key => {
        db.models[key].associate(db.models);
    });
    return db;
}