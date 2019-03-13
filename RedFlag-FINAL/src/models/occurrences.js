'user strict'

module.exports = (sequelize, DataType) => {

    const occurrences = sequelize.define('occurrences', {
        occurrences_id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        lat: DataType.STRING,
        long: DataType.STRING,
        isVictim: DataType.BOOLEAN,
        type: DataType.ENUM('1', '2', '3', '4', '5')

    }, {
        classMethods: {
            associate: function(models) {
                occurrences.belongsTo(models.user, { foreignKey: 'user_id', onDelete: 'cascade' })
                occurrences.hasOne(models.occurrence_state, { foreignKey: 'occurrences_id', onDelete: 'cascade' })
            },
        }
    });

    return occurrences;
};