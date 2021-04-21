const { Router } = require('express');

const ViceAdministrativos = require('../controllers/viceAdministrativo')
const Departamento = require('../controllers/departamentos')

const router = Router();

//informe largo
router.post('/',ViceAdministrativos.creaViceAdministrativo);
//departamento
router.get('/departamento/',Departamento.getDepartamentoId);

router.get('/',ViceAdministrativos.getViceAdministrativoId);
router.get('/todos',ViceAdministrativos.getViceAdministrativo );
router.get('/:_id',ViceAdministrativos.getIdViceAdministrativo);
router.put('/',ViceAdministrativos.actualizarViceAdministrativo);
router.delete('/:_id',ViceAdministrativos.eliminarViceAdministrativo);
//archivos



module.exports = router;