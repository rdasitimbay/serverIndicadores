const { Router } = require('express');

const Macro = require('../controllers/macroProceso')

const router = Router();

//informe largo
router.post('/',Macro.crearMacroProceso);
router.get('/',Macro.getMacroProceso);





module.exports = router;