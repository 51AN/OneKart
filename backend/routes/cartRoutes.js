const express = require('express')
const { addToCart, getCartItems, getTotalItem } = require('../controllers/cartController')
const router = express.Router()

router.post("/", addToCart)
router.get("/", getCartItems)
router.get("/total", getTotalItem)

module.exports = router