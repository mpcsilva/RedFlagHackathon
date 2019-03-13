'user strict'

module.exports = (sequelize, DataType) => {

    const occurrence_state = sequelize.define('occurrence_state', {
        occurrence_state_id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        data: DataType.DATE,
        state: {
            type: DataType.ENUM('1', '2', '3', '4'),
            defaultValue: '1'
        }

    }, {
        classMethods: {
            associate: function(models) {
                occurrence_state.belongsTo(models.occurrences, { foreignKey: 'occurrences_id', onDelete: 'cascade' })
            },
        }
    });

    return occurrence_state;
};