'use strict'

module.exports = (app) => {

    const usersController = app.src.controller.usersController;
    const contactsController = app.src.controller.contactsController;
    const medicalRecordController = app.src.controller.medicalRecordController;

    const auth = app.src.services.authService;
    app.post('/user', usersController.create)
    app.get('/user', auth.authService, usersController.getOne)
    app.post('/user/code', usersController.codeValidation)

    //Contacts
    app.post('/user/contact', auth.authService, contactsController.create)
    app.get('/user/contact', auth.authService, contactsController.getOne)


    //medical record
    app.put('/user/medicalrecord', auth.authService, medicalRecordController.update)
}