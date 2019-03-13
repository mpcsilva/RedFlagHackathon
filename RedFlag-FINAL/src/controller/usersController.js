'use strict'
const usersRepository = require('../repository/usersRepository');
const authService = require('../services/authService');
exports.getOne = async(req, res, next) => {

    try {
        const data = await usersRepository.getOne(req);

        if (!data) {
            res.status(404).send({
                data: {},
                message: 'Not found',
                erro: {}
            });
            return
        }
        res.status(200).send({
            data,
            message: 'Get one success',
            erro: {}
        });

    } catch (err) {
        console.log(err)
        res.status(500).send({
            data: {},
            message: 'Bad request',
            erro: err
        });
    }

}

exports.codeValidation = async(req, res, next) => {

    try {
        const data = await usersRepository.codeValidation(req);

        if (data === 404) {
            res.status(404).send({
                data: {},
                message: 'Not found',
                erro: {}
            });
            return
        }
        const token = await authService.generateToken({
            user_id: data.user_id,
            medical_record_id: data.medical_record,
            cpf: data.cpf,
            isVoluntary: data.isVoluntary,
            phone: data.phone,
            type: 'user',
            active: true
        });

        res.status(201).send({
            data: {
                token: token
            },
            message: "Success, you have a Token!",
            error: {}
        });

    } catch (err) {
        console.log(err)
        res.status(500).send({
            data: {},
            message: 'Bad request',
            erro: err
        });
    }

}

exports.create = async(req, res, next) => {

    try {

        const data = await usersRepository.create(req);

        res.status(200).send({
            data,
            message: 'create user success',
            erro: {}
        });

    } catch (err) {
        console.log(err)
        res.status(500).send({
            data: {},
            message: 'Bad request create user',
            erro: err
        });
    }

}