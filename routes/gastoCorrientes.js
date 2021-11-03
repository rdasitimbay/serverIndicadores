const { Router } = require('express');

const GastoCorrientes = require('../controllers/gastoCorriente')

const router = Router();

//informe largo
router.post('/',GastoCorrientes.creaGastoCorriente);
// Filtro Gastos
router.get('/filtros',GastoCorrientes.filtrosIndicadores);

router.get('/',GastoCorrientes.getGastoCorrienteId);
router.get('/todos',GastoCorrientes.getGastoCorriente );
router.get('/:_id',GastoCorrientes.getIdGastoCorriente);
router.put('/',GastoCorrientes.actualizarGastoCorriente);
router.delete('/:_id',GastoCorrientes.eliminarGastoCorriente);
//archivos



module.exports = router;