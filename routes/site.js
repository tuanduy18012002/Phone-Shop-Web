const express = require('express');
const router = express.Router()

const site_controller = require('../controllers/siteController')

router.get('/login', site_controller.login)
router.post('/login', site_controller.authen)
router.get('/register', site_controller.register)
router.post('/register', site_controller.authen_new)
router.use('/', site_controller.show)

module.exports = router