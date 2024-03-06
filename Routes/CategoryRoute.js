const express = require('express')
const router = express.Router()
const categoryController = require('../Controller/CategoryControllerler')


router.get('/cat/getAllCat', categoryController.getAllCategory)

router.get('/cat/getCat/:id', categoryController.getOneCategory)

router.post('/cat/postCat/', categoryController.postCategory)

router.patch('/cat/updateCat/:id', categoryController.updateCaregory)

router.delete('/cat/deleteCat/:id', categoryController.deleteCategory)


module.exports = router