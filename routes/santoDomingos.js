const { Router } = require('express');

const SantoDomingos = require('../controllers/santoDomingo')
const Departamento = require('../controllers/departamentos')

const router = Router();

//informe largo
router.post('/',SantoDomingos.creaSantoDomingo);
//departamento
router.get('/departamento/',Departamento.getDepartamentoId);

router.get('/',SantoDomingos.getSantoDomingoId);
router.get('/todos',SantoDomingos.getSantoDomingo );
router.get('/:_id',SantoDomingos.getIdSantoDomingo);
router.put('/',SantoDomingos.actualizarSantoDomingo);
router.delete('/:_id',SantoDomingos.eliminarSantoDomingo);
//archivos



module.exports = router;