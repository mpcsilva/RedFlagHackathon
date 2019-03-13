'use strict'
const authService = require('../services/authService');

exports.getOne = async(req, res, next) => {
    const repository = req.app.src.config.db.models;
    try {

        const data = await repository.occurrence_state.findOne({
            where: {
                state: "1"
            },
            order: [
                ['occurrence_state_id', "DESC"]
            ]
        });

        return data;

    } catch (e) {
        console.log(e)
        return e;
    }

}
exports.accepted = async(req, res, next) => {
    const repository = req.app.src.config.db.models;
    try {
        const data = await repository.occurrence_state.update({
            state: "2"
        }, {
            where: {
                occurrence_state_id: req.body.occurrence_state_id
            }
        });

        return data;

    } catch (e) {
        console.log(e)
        throw e;
    }

}

exports.tracking = async(req, res, next) => {
    const repository = req.app.src.config.db.models;
    try {
        const data = await repository.voluntary_avaliable.create(req.body);

        return data;

    } catch (e) {
        console.log(e)
        throw e;
    }

}

exports.lastTraking = async(req, res, next) => {
    const repository = req.app.src.config.db.models;
    try {
        const data = await repository.voluntary_avaliable.findOne({
            where: {
                active: true
            },
            order: [
                ['updatedAt', 'DESC']
            ]

        });
        return data;
    } catch (e) {
        console.log(e)
        throw e;
    }

}