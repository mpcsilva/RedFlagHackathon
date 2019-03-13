'use strict'

module.exports = (app) => {

    const voluntaryAvaliable = app.src.controller.voluntaryAvaliableController;
    const auth = app.src.services.authService;

    app.get('/occurrence/voluntary', voluntaryAvaliable.getOne)
    app.post('/occurrence/voluntary/tracking', voluntaryAvaliable.tracking)
    app.get('/occurrence/voluntary/tracking/last', voluntaryAvaliable.lastTraking)
    app.put('/occurrence/voluntary/accept', voluntaryAvaliable.accepted)

}