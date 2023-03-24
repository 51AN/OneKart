const express = require('express')
const { registerUser } = require('../controllers/userController')
const { loginUser } = require('../controllers/userController')
const { getAllUsers } = require('../controllers/userController')
const router = express.Router()

router.get('/', getAllUsers)
router.post('/login', loginUser)
router.post('/register', registerUser)

module.exports = router