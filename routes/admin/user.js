const express = require('express');
const router = express.Router()

const user_controller = require('../../controllers/admin/userController')

router.post('/:slug', user_controller.uppro)
router.get('/:slug', user_controller.detail)
router.get('/', user_controller.index)

module.exports = router