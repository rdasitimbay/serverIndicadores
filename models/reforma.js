const mongoose = require('mongoose');

const ReformaSchema = mongoose.Schema({

requirente:String,
numeroModificacion:String,
fechapresupuestaria:String,
tipoGasto:String,
tipoModificacion:String,
montoSolicitado:String,
justificacion:String,
resolucion:String,
modificacionPresupuestaria:Array,
reprogramacionFinaciera:Array,


requisito1:String,
requisito2:String,
requisito3:String,
requisito4:String,
descripcion:String,

analisisInformeRequisito:String,
analisisInformeRequisito2:String,
analisisInformeRequisito3:String,
analisisInformeRequisito4:String,
analisisInformeRequisitoDescripcion:String,

analistaTecnico1:String,
analistaTecnico2:String,
analistaTecnico3:String,
analistaTecnicoDescripcion:String,

dicatemPresupuestaria1:String,
dicatemPresupuestaria2:String,
dicatemPresupuestariaDescripcion:String,

firmaResponsabilidad:String,
firmaResponsabilidad1:String,
firmaResponsabilidad2:String,
firmaResponsabilidad3:String,
firmaResponsabilidad4:String,
firmaResponsabilidad5:String,
firmaResponsabilidad6:String,
firmaResponsabilidad7:String,
firmaResponsabilidad8:String,

firmaAnalisisPoa:String,
firmaAnalisisPoa1:String,
firmaAnalisisPoa2:String,

firmaTecnico:String,
firmaTecnico1:String,
firmaTecnico2:String,
firmaTecnico3:String,
firmaTecnico4:String,
firmaTecnico5:String,

firmaDicatamen:String,
firmaDicatamen1:String,
firmaDicatamen2:String,
firmaDicatamen3:String,
firmaDicatamen4:String,
firmaDicatamen5:String,
firmaDicatamen6:String,
firmaDicatamen7:String,
firmaDicatamen8:String,

firmaAprobacion:String,
firmaAprobacion1:String,
firmaAprobacion2:String,
firmaAprobacion3:String,
firmaAprobacion4:String,
firmaAprobacion5:String,
firmaAprobacion6:String,
firmaAprobacion7:String,
firmaAprobacion8:String,


urlPdf:Array,
  

fechaReporte: { type: Date, required: true, default: Date.now },
usuario: {
type: mongoose.Types.ObjectId, ref: 'Usuario'
},
   

})

module.exports = mongoose.model('Reforma',ReformaSchema);