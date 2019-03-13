'user strict'

module.exports = (sequelize, DataType) => {

    const medical_record = sequelize.define('medical_record', {
        medical_id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        blood: DataType.STRING,
        diseases: DataType.STRING,
        deficiency: DataType.STRING

    }, {
        classMethods: {
            associate: function(models) {
                medical_record.belongsTo(models.user, { foreignKey: 'user_id', onDelete: 'cascade' })
            },
        }
    });

    return medical_record;
};