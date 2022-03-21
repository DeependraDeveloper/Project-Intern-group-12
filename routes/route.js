const express = require('express');
const router = express.Router();

//------------------------------------------------------------------------------------------------
const allController = require('../controller/allController')







//=-------------------------------------------------------------------------------------------------
router.post("/college", allController.createCollege)

router.post("/intern", allController.createIntern)

router.get('/details', allController.getDetails)




module.exports = router;