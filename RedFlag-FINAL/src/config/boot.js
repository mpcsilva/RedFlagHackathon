'user strict'

module.exports = app => {
    //Faz o sync dos models no banco de dados
    app.src.config.db.sequelize.sync().done(() => {
        console.log(`##################################\n`);
        console.log(`INICIALIZAÇÃO OK`);
        console.log(`\n##################################`);
    });
}