const mongoose = require('mongoose');

const IasasSchema = mongoose.Schema({

    campos: Array,
    resultado: Array
   

})

module.exports = mongoose.model('Iasas',IasasSchema);