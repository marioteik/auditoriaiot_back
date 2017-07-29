var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var auditoria = new Schema({
    name: { type: String, required: true },
    period: {
        start: { type: Date, default: Date.now },
        end: Date
    },
    chat: [
        {
            user: String,
            timestamp: { type: Date, default: Date.now },
            text: String
        }
    ],
    approval: {
        user: String,
        timestamp: Date,
        status: {
            type: String,
            enum: ['Aguardando', 'Reprovado', 'Aprovado'],
            default: 'Aguardando'
        }
    }
});

module.exports = db.model('Auditorias', auditoria);
