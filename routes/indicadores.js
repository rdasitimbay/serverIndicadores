const { Router } = require('express');

const Indicador = require('../controllers/indicadores')

const router = Router();


router.get('/listarIndicadoresRol', Indicador.listarIndicadoresRol);
router.get('/listarIndicadoresUsuario', Indicador.listarIndicadoresUsuario);

//informe largo
router.post('/',Indicador.creaIndicador);
//Todos Indicadores
router.post('/todos',Indicador.allCreaIndicador);
//Unidades Indicadores
router.get('/unidades',Indicador.getUnidadesIndicador);
 
router.get('/usuario',Indicador.getIndicadorId);

router.get('/todos',Indicador.getIndicador );
//Filtros
router.get('/filtros',Indicador.filtrosIndicadores);
//Descargar Archivo
router.get('/descargar',Indicador.descargarFileIndicador);
router.get('/:_id',Indicador.getIdIndicador);
router.put('/',Indicador.actualizarIndicadores);
router.delete('/:_id',Indicador.eliminarIndicador);

//Eliminar varios
router.post('/deleteAll',Indicador.deleteIndicadoresVarios);
//archivos

module.exports = router;