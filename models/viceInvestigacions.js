const mongoose = require('mongoose');

const ViceInvestigacionsSchema = mongoose.Schema({

    campos: Array,
    resultado: Array
    
   

})

module.exports = mongoose.model('ViceInvestigacions',ViceInvestigacionsSchema);