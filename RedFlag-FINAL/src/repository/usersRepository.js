'use strict'
const md5 = require('md5');
const authService = require('../services/authService');

exports.getOne = async(req, res, next) => {
    const repository = req.app.src.config.db.models;
    try {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dataToken = await authService.decodeToken(token);

        const data = await repository.user.findOne({
            include: [{
                model: repository.medical_record
            }, {
                model: repository.contacts
            }, {
                model: repository.code_validation
            }],
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
exports.codeValidation = async(req, res, next) => {
    const repository = req.app.src.config.db.models;

    try {

        const data = await repository.code_validation.findOne({
            where: {
                user_id: req.body.user_id,
                code: req.body.code
            }
        });
        if (data) {
            const userData = await repository.user.findOne({
                include: [{
                    model: repository.medical_record
                }, {
                    model: repository.contacts
                }, {
                    model: repository.code_validation
                }],
                where: {
                    user_id: req.body.user_id
                }
            })
            return userData
        } else {
            return 404
        }

    } catch (e) {
        console.log(e)
        return e;
    }

}

exports.create = async(req, res, next) => {
    const repository = req.app.src.config.db.models;
    try {
        let _user;
        let returnUser;
        req.body.password = md5(req.body.password);

        const data = await repository.user.create(req.body)
            .then(async(user) => {
                _user = user.user_id;
                repository.medical_record.create({
                    user_id: _user
                })
            })
            .then(async() => {
                const code = await repository.code_validation.create({
                    code: req.body.code,
                    user_id: _user
                })

                returnUser = {
                    user_id: _user,
                    code: code.code
                };
            })
        return returnUser;

    } catch (e) {
        console.log(e)
        throw e;
    }

}