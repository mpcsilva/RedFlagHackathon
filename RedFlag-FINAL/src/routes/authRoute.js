'use strict'

module.exports = (app) => {
    const authController = app.src.controller.authController;
    app.post('/auth', authController.getById)
    app.post('/auth/voluntary', authController.authVoluntary)
}