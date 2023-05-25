const express = require('express')
const { createOrders } = require('../controllers/orderController')
const router = express.Router()

router.post('/createOrders/', createOrders)

module.exports = router