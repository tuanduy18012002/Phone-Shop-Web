const express = require('express');
const router = express.Router()

const product_controller = require('../../controllers/admin/productController')

router.post('/:slug', product_controller.uppro)
router.get('/:slug', product_controller.detail)
router.get('/', product_controller.index)

module.exports = router