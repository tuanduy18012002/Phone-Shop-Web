const express = require('express');
const router = express.Router()

const site_controller = require('../controllers/siteController')

router.use('/login', site_controller.log)
router.use('/', site_controller.show)

module.exports = router