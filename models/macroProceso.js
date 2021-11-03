const mongoose = require('mongoose');

const MacroProcesoSchema = mongoose.Schema({

    macroProceso:  String,
   

})

module.exports = mongoose.model('MacroProceso',MacroProcesoSchema);