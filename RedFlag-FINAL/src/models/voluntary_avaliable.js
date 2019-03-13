'user strict'

module.exports = (sequelize, DataType) => {

    const voluntary_avaliable = sequelize.define('voluntary_avaliable', {
        voluntary_avaliable_id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        active: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        lat: DataType.STRING,
        long: DataType.STRING

    }, {
        classMethods: {
            associate: function(models) {
                voluntary_avaliable.belongsTo(models.user, { foreignKey: 'user_id', onDelete: 'cascade' })
            },
        }
    });

    return voluntary_avaliable;
};