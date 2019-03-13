'use strict'
const voluntaryAvaliableRepository = require('../repository/voluntaryAvaliableRepository');

exports.getOne = async(req, res, next) => {

    try {
        const data = await voluntaryAvaliableRepository.getOne(req);

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
exports.accepted = async(req, res, next) => {

    try {
        const data = await voluntaryAvaliableRepository.accepted(req);

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
            message: 'update one occ success',
            erro: {}
        });

    } catch (err) {
        console.log(err)
        res.status(500).send({
            data: {},
            message: 'update request',
            erro: err
        });
    }

}

exports.tracking = async(req, res, next) => {

    try {
        const data = await voluntaryAvaliableRepository.tracking(req);

        res.status(200).send({
            data,
            message: 'traking success',
            erro: {}
        });

    } catch (err) {
        console.log(err)
        res.status(500).send({
            data: {},
            message: 'bad traking request',
            erro: err
        });
    }

}
exports.lastTraking = async(req, res, next) => {

    try {
        const data = await voluntaryAvaliableRepository.lastTraking(req);

        res.status(200).send({
            data,
            message: 'traking success',
            erro: {}
        });

    } catch (err) {
        console.log(err)
        res.status(500).send({
            data: {},
            message: 'bad traking request',
            erro: err
        });
    }

}