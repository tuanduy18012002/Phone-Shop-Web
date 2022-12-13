const express = require('express');
const router = express.Router()

const product_controller = require('../controllers/productController')

router.use('/:slug', product_controller.show)
router.use('/', product_controller.index)

module.exports = router