const mongoose = require('mongoose');

const GastoCorrientesSchema = mongoose.Schema({

    /* ORG: Number,
    ORGDESC: Number,
    EOD:Number,
    EODDESC:String,
    CUP:Number,
    NOMBREDELCUP:Number,
    ESTRUCTURA:Number,
    ACTIVIDAD:String,
    ITEM:String,
    CODIGOG5:Number,
    ITEM2:Number,
    GRUPO:Number,
    FUENTE:Number,
    ASIGNADO:Number,
    COMPROMETIDO:Number,
    DEVENGADO:Number,
    PAGADO:Number,
    SALDOPORCOMPROMETER:Number,
    SALDOPORDEVENGAR:Number,
    SALDOPORPAGAR:Number,
    DEEJE:Number, */
    tipoGasto: String,
    campos: Array,
    resultado: Array
    
})

module.exports = mongoose.model('GastoCorrientes',GastoCorrientesSchema);