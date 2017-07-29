var express = require('express');

var routes = function (Auditorias) {
    var auditoriaRouter = express.Router();
    var auditoriaCtrl = require('../controllers/auditoria')(Auditorias);

    auditoriaRouter.route('/')
        .get(auditoriaCtrl.getAll);
    auditoriaRouter.route('/start')
        .post(auditoriaCtrl.start);
    auditoriaRouter.route('/isActive')
        .get(auditoriaCtrl.isActive);
    auditoriaRouter.route('/stop')
        .get(auditoriaCtrl.stop);

    /*auditoriaRouter.use('/:auditoriaId', auditoriaCtrl.returnOne);

    auditoriaRouter.route('/:auditoriaId')
        .get(auditoriaCtrl.getOne)
        .patch(auditoriaCtrl.patch)
        .delete(auditoriaCtrl.delete);*/

    return auditoriaRouter;
};

module.exports = routes;
