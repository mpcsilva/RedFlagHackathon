'use strict'

module.exports = (sequelize, DataType) => {

    const uuid = require('node-uuid')
    const user = sequelize.define('user', {
        user_id: {
            type: DataType.UUID,
            primaryKey: true,
            defaultValue: uuid.v4()
        },
        password: DataType.STRING,
        birthday: DataType.STRING,
        cpf: {
            type: DataType.BIGINT,
            unique: true
        },
        name: {
            type: DataType.STRING
        },
        phone: {
            type: DataType.BIGINT
        },
        isVoluntary: DataType.BOOLEAN
    }, {
        classMethods: {
            associate: function(models) {
                user.hasOne(models.medical_record, { foreignKey: 'user_id' })
                user.hasOne(models.code_validation, { foreignKey: 'user_id' })
                user.hasMany(models.contacts, { foreignKey: 'user_id' })
                user.hasMany(models.occurrences, { foreignKey: 'user_id' })

            },
        }
    });
    return user;

};