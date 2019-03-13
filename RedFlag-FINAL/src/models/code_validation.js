'user strict'

module.exports = (sequelize, DataType) => {

    const code_validation = sequelize.define('code_validation', {
        code_validation_id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataType.BIGINT,
            defaultValue: 193
        }

    }, {
        classMethods: {
            associate: function(models) {
                code_validation.belongsTo(models.user, { foreignKey: 'user_id', onDelete: 'cascade' })
            },
        }
    });

    return code_validation;
};