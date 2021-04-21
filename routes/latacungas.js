const { Router } = require('express');

const Latacungas = require('../controllers/latacunga')
const Departamento = require('../controllers/departamentos')

const router = Router();

//informe largo
router.post('/',Latacungas.creaLatacunga);
//departamento
router.get('/departamento/',Departamento.getDepartamentoId);

router.get('/',Latacungas.getLatacungaId);
router.get('/todos',Latacungas.getLatacunga );
router.get('/:_id',Latacungas.getIdLatacunga);
router.put('/',Latacungas.actualizarLatacunga);
router.delete('/:_id',Latacungas.eliminarLatacunga);
//archivos



module.exports = router;