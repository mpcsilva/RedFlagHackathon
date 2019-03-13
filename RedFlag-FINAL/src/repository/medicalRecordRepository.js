'use strict'
const authService = require('../services/authService');

exports.update = async(req, res, next) => {
    const repository = req.app.src.config.db.models;
    try {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dataToken = await authService.decodeToken(token);

        const data = await repository.medical_record.update(req.body, {
            where: {
                medical_id: dataToken.medical_record_id,
                user_id: dataToken.user_id
            }
        });
        return data;

    } catch (e) {
        console.log(e)
        return e;
    }

}