var AuditoriaController = function(Auditorias) {
    var getAll = function(req, res) {
        var query = {};

        Auditorias.find(query, function (err, auditorias) {
            if(err)
                res.status(500).send(err);
            else
                var returnAuditorias = [];
            auditorias.forEach(function (elem, i, arr) {
                var el = elem.toJSON();
                el.links = {};
                el.links.self = 'http://' + req.headers.host + '/auditoria/' + el._id;
                returnAuditorias.push(el);
            });
            res.json(returnAuditorias);
        });
    };

    var getOne = function (req, res) {
        var returnAuditoria = req.auditoria.toJSON();
        returnAuditoria.links = {};
        res.json(returnAuditoria);
    };

    var patchOne = function (req, res) {
        if(req.body._id)
            delete req.auditoria._id;

        for(var p in req.body) {
            req.auditoria[p] = req.auditoria[p];
        }

        req.auditoria.save(function (err) {
            if(err)
                res.status(500).send(err);
            else
                res.json(req.auditoria);
        });
    };

    var deleteOne = function (req, res) {
        req.auditoria.remove(function (err) {
            if(err)
                res.status(500).send(err);
            else
                res.status(204).send('Removed');
        });
    };

    var returnOne = function (req, res, next) {
        Auditorias.findById(req.params.auditoriaId, function (err, auditoria) {
            if(err)
                res.status(500).send(err);
            else if (auditoria) {
                req.auditoria = auditoria;
                next();
            } else
                res.status(404).send('Nenhuma auditoria encontrada.');
        });
    };

    var start = function (req, res) {
        var auditoria = new Auditorias(req.body);

        if(req.body) {
            if(!req.body.name) {
                res.status(400);
                res.send({err: "You're almost dumb", message:'Name is required.'});
            } else {
                auditoria.save();
                res.status(201);
                res.send(auditoria);
            }
        } else {
            res.send({err: "You're dumb", message:'You have to send some payload.'});
        }
    }

    var stop = function (req, res) {
        Auditorias.findOneAndUpdate({'period.end': {$exists: false}}, { $set: { 'period.end': Date.now() }}, {new: true}, function(err, auditoria){
            if(err){
                console.log("Something wrong when updating data!");
            }
            res.send(auditoria);
        });
    }

    var isActive = function (req, res) {
        Auditorias.findOne({'period.end': {$exists: false}}, {}, { sort: { 'created_at' : -1 } }, function(err, auditoria) {
            res.send(auditoria);
        });
    }

    return {
        start: start,
        stop: stop,
        isActive: isActive,
        getAll: getAll,
        getOne: getOne,
        returnOne: returnOne,
        patch: patchOne,
        delete: deleteOne
    }
}

module.exports = AuditoriaController;
