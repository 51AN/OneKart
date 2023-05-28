const express = require('express')
const { registerUser, logoutUser, getData, getDataManager } = require('../controllers/userController')
const { loginUser } = require('../controllers/userController')
const { getAllUsers } = require('../controllers/userController')
const router = express.Router()

router.get('/', getAllUsers)
router.get('/getdata/', getData)
router.get('/getdatamanager/', getDataManager)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/register', registerUser)

module.exports = router