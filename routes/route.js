const express = require('express');
const router = express.Router();

const allContoller = require('../controller/allController');


//Collage creation
router.post('/functionUp/Colleges', allContoller.createCollege);
//Register for internship
router.post('/functionUp/interns', allContoller.createInterns);
//List students applied internship
router.get("/functionup/collegeDetails", allContoller.giveAllInterns)

module.exports = router;