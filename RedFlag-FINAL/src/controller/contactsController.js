'use strict'
const contactsRepository = require('../repository/contactsRepository');



exports.getOne = async(req, res, next) => {

    try {
        const data = await contactsRepository.getOne(req);

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
exports.create = async(req, res, next) => {

    try {
        const data = await contactsRepository.create(req);

        res.status(200).send({
            data,
            message: 'create contact success',
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