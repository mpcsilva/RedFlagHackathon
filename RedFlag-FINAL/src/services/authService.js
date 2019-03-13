'use strict'
const jwt = require('jsonwebtoken-refresh');

exports.generateToken = async(data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async(token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authService = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            data: {},
            message: 'Deny, your not have a token!'
        });

    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decode) {
            if (error) {
                res.status(401).json({
                    message: 'Deny! Token invalid!'
                })
            } else {
                if (decode.type == 'user') {
                    if (decode.active) {
                        next();
                    } else {
                        res.status(400).send({
                            data: {},
                            message: 'Deny user inactive'
                        });
                    }
                } else {
                    res.status(400).send({
                        data: {},
                        message: 'Deny'
                    });
                }
            }
        })
    }
}