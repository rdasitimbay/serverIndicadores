const mongoose = require('mongoose');

const LatacungasSchema = mongoose.Schema({

    campos: Array,
    resultado: Array


})

module.exports = mongoose.model('Latacungas',LatacungasSchema);