var AuditoriaController = function() {
    var start = function (req, res) {
        res.send('Start');
    }

    var stop = function (req, res) {
        res.send('Stop');
    }

    return {
        start: start,
        stop: stop
    }
}

module.exports = AuditoriaController;
