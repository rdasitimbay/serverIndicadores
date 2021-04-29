const mongoose = require('mongoose');

const GastoCorrientesSchema = mongoose.Schema({

    tipoGasto: String,
    campos: Array,
    resultado: Array,
})

module.exports = mongoose.model('GastoCorrientes',GastoCorrientesSchema);