const mongoose = require('mongoose');

const ViceDocenciasSchema = mongoose.Schema({

    campos: Array,
    resultado: Array,
    campos1: Array
   

})

module.exports = mongoose.model('ViceDocencias',ViceDocenciasSchema);