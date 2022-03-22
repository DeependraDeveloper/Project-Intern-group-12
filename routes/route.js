const express = require('express');
const router = express.Router();

const contoller1 = require('../controller/collegeController');

const contoller2 = require('../controller/internController');



router.post('/functionUp/Colleges', contoller1.createCollege);

router.post('/functionUp/interns', contoller2.createInterns);

router.get("/functionup/collegeDetails", contoller2.giveAllInterns)

module.exports = router;