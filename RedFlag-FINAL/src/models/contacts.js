'user strict'

module.exports = (sequelize, DataType) => {

    const contacts = sequelize.define('contacts', {
        contacts_id: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataType.STRING,
        phone: DataType.STRING

    }, {
        classMethods: {
            associate: function(models) {
                contacts.belongsTo(models.user, { foreignKey: 'user_id', onDelete: 'cascade' })
            },
        }
    });

    return contacts;
};