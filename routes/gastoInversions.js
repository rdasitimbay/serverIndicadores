
const express=require('express')
const gastoInversions= require('../controllers/gastoInversion')

const router = express.Router();
//Creacion de las rutas y funciones de crear y obtener datos
router.post('/',gastoInversions.crearGastoInversion);
router.get('/', gastoInversions.obtenerGastoInversions);
router.get('/:id',gastoInversions.obtenerGastoInversion);



module.exports = router;