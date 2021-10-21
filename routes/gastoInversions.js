
const express=require('express')
const gastoInversions= require('../controllers/gastoInversion')

const router = express.Router();

router.post('/',gastoInversions.crearGastoInversion);
router.get('/', gastoInversions.obtenerGastoInversions);
router.get('/:id',gastoInversions.obtenerGastoInversion);



module.exports = router;