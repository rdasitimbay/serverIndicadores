const { Router } = require('express');

const ViceInvestigacions = require('../controllers/viceInvestigacion')
const Departamento = require('../controllers/departamentos')

const router = Router();

//informe largo
router.post('/',ViceInvestigacions.creaViceInvestigacion);
//departamento 
router.get('/departamento/',Departamento.getDepartamentoId);

router.get('/',ViceInvestigacions.getViceInvestigacionId);
router.get('/todos',ViceInvestigacions.getViceInvestigacion );
router.get('/:_id',ViceInvestigacions.getIdViceInvestigacion);
router.put('/',ViceInvestigacions.actualizarViceInvestigacion);
router.delete('/:_id',ViceInvestigacions.eliminarViceInvestigacion);
//archivos



module.exports = router;