const express = require('express')
const router = express.Router()
const relation = require('../Controller/RelationsController')

router.get('/relation/allInfo', relation.getallInfo)


router.get('/relation/search/:name', relation.getinfoParam)


module.exports = router