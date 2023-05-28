const express = require('express')
const { createOrders, getMyOrders, getBranchOrders, getOrderStatus, updateOrderStatus, getUserData } = require('../controllers/orderController')
const router = express.Router()

router.post('/createOrders/', createOrders)
router.get('/getMyOrders/', getMyOrders)
router.get('/getBranchOrders/', getBranchOrders)
router.get('/status/:id', getOrderStatus)
router.get('/getUserData/:id', getUserData)
router.put('/updateOrder/:id', updateOrderStatus)

module.exports = router