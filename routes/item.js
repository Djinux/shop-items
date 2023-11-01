const express = require('express')
const controller = require('../controllers/item')

const router = express.Router()

router.get('/', controller.showAllItems)

module.exports = router
