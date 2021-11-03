const mongoose = require('mongoose');

const SantoDomingosSchema = mongoose.Schema({

    campos: Array,
    resultado: Array
   

})

module.exports = mongoose.model('SantoDomingos',SantoDomingosSchema);