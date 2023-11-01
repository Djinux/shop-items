const express = require('express')
const controller = require('../controllers/order')

const router = express.Router()

router.get('/make', controller.showOrder)
router.post('/orderingItem', controller.createOrder)

module.exports = router
