const express = require('express')
const { addToCart, getCartItems, getTotalItem, increaseItem, decreaseItem, deleteItem, getTotalAmount } = require('../controllers/cartController')
const router = express.Router()

router.post("/", addToCart)
router.get("/", getCartItems)
router.get("/total", getTotalItem)
router.put("/increase/:id", increaseItem)
router.put("/decrease/:id", decreaseItem)
router.delete("/delete/:id", deleteItem)
router.get("/totalamount", getTotalAmount)

module.exports = router