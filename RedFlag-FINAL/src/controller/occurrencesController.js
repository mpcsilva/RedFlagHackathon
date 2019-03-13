'use strict'
const occurrencesRepository = require('../repository/occurrencesRepository');

exports.getOne = async(req, res, next) => {

    try {
        const data = await occurrencesRepository.getOne(req);

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
            message: 'Get one occ success',
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
exports.create = async(req, res, next) => {

    try {

        const data = await occurrencesRepository.create(req);

        res.status(200).send({
            data,
            message: 'create occ success',
            erro: {}
        });

    } catch (err) {
        console.log(err)
        res.status(500).send({
            data: {},
            message: 'Bad request create occ',
            erro: err
        });
    }

}