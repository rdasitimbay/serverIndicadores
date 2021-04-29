const { Router } = require('express');

const ViceDocencias = require('../controllers/viceDocencia')
const Departamento = require('../controllers/departamentos')

const router = Router();

//informe largo
router.post('/',ViceDocencias.creaViceDocencia);
//departamento 
router.get('/departamento/',Departamento.getDepartamentoId);

router.get('/',ViceDocencias.getViceDocenciaId);
router.get('/todos',ViceDocencias.getViceDocencia );
router.get('/:_id',ViceDocencias.getIdViceDocencia);
router.put('/',ViceDocencias.actualizarViceDocencia);
router.delete('/:_id',ViceDocencias.eliminarViceDocencia);
//archivos



module.exports = router;