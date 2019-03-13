'use strict'

module.exports = (app) => {

    const occurrencesController = app.src.controller.occurrencesController;
    const contactsController = app.src.controller.contactsController;
    const auth = app.src.services.authService;
    app.post('/occurrence/', auth.authService, occurrencesController.create)
    app.get('/occurrence/', auth.authService, occurrencesController.getOne)


}