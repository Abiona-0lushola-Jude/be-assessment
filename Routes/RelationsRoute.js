const express = require('express')
const router = express.Router()
const relation = require('../Controller/RelationsController')

router.get('/allInfo', relation.getallInfo)


module.exports = router