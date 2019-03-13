'use strict'
const authService = require('../services/authService');

exports.getOne = async(req, res, next) => {
    const repository = req.app.src.config.db.models;
    try {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dataToken = await authService.decodeToken(token);

        var idOcc = req.body.idOcc || req.query.idOcc || req.headers['idOcc'];
        console.log(idOcc)

        const data = await repository.occurrences.findOne({
            include: [{
                model: repository.user,
                include: [{
                    model: repository.medical_record
                }, {
                    model: repository.contacts
                }]
            }],
            where: {
                occurrences_id: idOcc,
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
        let _occ;
        const _occdata = await repository.occurrences.create({
                lat: req.body.lat,
                long: req.body.long,
                isVictim: req.body.isVictim,
                type: req.body.type,
                user_id: dataToken.user_id
            })
            .then(async(occ) => {
                const state = await repository.occurrence_state.create({
                    data: Date.now(),
                    occurrences_id: occ.occurrences_id
                })
                _occ = occ
            })

        return _occ;

    } catch (e) {
        console.log(e)
        return e;
    }

}