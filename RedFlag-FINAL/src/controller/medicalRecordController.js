'use strict'
const medicalRecordRepository = require('../repository/medicalRecordRepository');

exports.update = async(req, res, next) => {

    try {
        const data = await medicalRecordRepository.update(req);

        res.status(200).send({
            data,
            message: 'Update medical record success',
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