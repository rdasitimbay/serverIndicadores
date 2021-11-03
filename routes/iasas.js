const { Router } = require('express');

const Iasas = require('../controllers/iasa')
const Departamento = require('../controllers/departamentos')

const router = Router();

//informe largo
router.post('/',Iasas.creaIasa);
//departamento
router.get('/departamento/',Departamento.getDepartamentoId);

router.get('/',Iasas.getIasaId);
router.get('/todos',Iasas.getIasa );
router.get('/:_id',Iasas.getIdIasa);
router.put('/',Iasas.actualizarIasa);
router.delete('/:_id',Iasas.eliminarIasa);
//archivos



module.exports = router;