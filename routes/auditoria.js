var express = require('express');
var router = express.Router();
var auditoriaController = require('../controllers/auditoria')();

// inicia auditoria
router.get('/start', function (req, res) {
    auditoriaController.start(req, res);
});

// para auditoria
router.get('/stop', function (req, res) {
    auditoriaController.stop(req, res);
});

module.exports = router;
