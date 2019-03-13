'use strict'

const authService = require('../services/authService');
const md5 = require('md5')
    //Cria Token de acesso
exports.getById = async(req, res, next) => {

        const repository = req.app.src.config.db.models;


        //GERA NOVO TOKEN
        try {
            let password = md5(req.body.password);

            const user = await repository.user.findOne({
                include: [{
                    model: repository.medical_record,
                    attributes: ['medical_id']
                }],
                where: {
                    cpf: req.body.cpf,
                    password: password
                }
            });


            if (!user) {

                res.status(401).send({
                    data: {},
                    message: "Bad credentials.",
                    erro: 'Token User'
                });
                return;
            }

            const token = await authService.generateToken({
                user_id: user.user_id,
                medical_record_id: user.medical_record.medical_id,
                cpf: user.cpf,
                isVoluntary: user.isVoluntary,
                phone: user.phone,
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



        } catch (e) {
            console.log(e)
            res.status(500).send({
                data: {},
                message: "Bad request Token!",
                erro: e
            });
        }


    }
    //Cria Token de acesso
exports.authVoluntary = async(req, res, next) => {

    const repository = req.app.src.config.db.models;


    //GERA NOVO TOKEN
    try {
        let password = md5(req.body.password);

        const user = await repository.user.findOne({
            include: [{
                model: repository.medical_record,
                attributes: ['medical_id']
            }],
            where: {
                cpf: req.body.cpf,
                password: password,
                isVoluntary: true
            }
        });


        if (!user) {

            res.status(401).send({
                data: {},
                message: "Bad credentials.",
                erro: 'Token User'
            });
            return;
        }

        const token = await authService.generateToken({
            user_id: user.user_id,
            medical_record_id: user.medical_record.medical_id,
            cpf: user.cpf,
            isVoluntary: user.isVoluntary,
            phone: user.phone,
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



    } catch (e) {
        console.log(e)
        res.status(500).send({
            data: {},
            message: "Bad request Token!",
            erro: e
        });
    }


}