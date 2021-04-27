const { Router } = require('express');

const Indicador = require('../controllers/indicadores')

const router = Router();

//informe largo
router.post('/',Indicador.creaIndicador);
 
router.get('/',Indicador.getIndicadorId);
router.get('/todos',Indicador.getIndicador );
//Filtros
router.get('/filtros',Indicador.filtrosIndicadores);
router.get('/:_id',Indicador.getIdIndicador);
router.put('/',Indicador.actualizarIndicadores);
router.delete('/:_id',Indicador.eliminarIndicador);
//archivos



module.exports = router;