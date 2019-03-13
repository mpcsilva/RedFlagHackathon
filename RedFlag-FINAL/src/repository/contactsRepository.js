'use strict'
const authService = require('../services/authService');

exports.getOne = async(req, res, next) => {
    const repository = req.app.src.config.db.models;

    try {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dataToken = await authService.decodeToken(token);

        const data = await repository.contacts.findAll({
            where: {
                user_id: dataToken.user_id
            }
        });
        return data;

    } catch (e) {
        console.log(e)
        return e;
    }

}

exports.create = async(req, res, next) => {
    const repository = req.app.src.config.db.models;
    try {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dataToken = await authService.decodeToken(token);

        const data = await repository.contacts.create({
            name: req.body.name,
            phone: req.body.phone,
            user_id: dataToken.user_id
        })

        return data;

    } catch (e) {
        console.log(e)
        return e;
    }

}