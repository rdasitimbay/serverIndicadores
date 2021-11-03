const { Router } = require('express');

const Vags = require('../controllers/vag')
const Departamento = require('../controllers/departamentos')

const router = Router();

//informe largo
router.post('/',Vags.creaVag);
//departamento
router.get('/departamento/',Departamento.getDepartamentoId);

router.get('/',Vags.getVagId);
router.get('/todos',Vags.getVag );
router.get('/:_id',Vags.getIdVag);
router.put('/',Vags.actualizarVag);
router.delete('/:_id',Vags.eliminarVag);
//archivos



module.exports = router;