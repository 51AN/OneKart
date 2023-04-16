const express = require('express')
const { testSession } = require('../controllers/testController')
const router = express.Router()

router.get('/', testSession)

module.exports = router