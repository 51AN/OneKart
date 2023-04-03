const express = require('express')
const { getBranch } = require('../controllers/branchController')
const router = express.Router()

router.get('/:id', getBranch)

module.exports = router