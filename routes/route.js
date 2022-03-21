const express = require('express');
const router = express.Router();

//------------------------------------------------------------------------------------------------
const allController = require('../controller/allController')







//=-------------------------------------------------------------------------------------------------
router.post("/Authors", authorController.createAuthor)

router.post("/login", blogController.loginAuthor)

router.post('/blogs', mid1.mid1, blogController.Blogs)




module.exports = router;