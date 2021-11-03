const { Router } = require('express');

const unidad = require('../controllers/unidad')

const router = Router();

//informe largo
router.post('/',unidad.crearUnidad);
router.get('/',unidad.getUnidades);





module.exports = router;