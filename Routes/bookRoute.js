const express = require('express')
const router = express.Router()
const bookController = require('../Controller/bookController')


router.get('/book/getAll', bookController.getAllBooks)

router.get('/book/getBook/:id', bookController.getOneBook)

router.post('/book/postBook', bookController.postOneBook)

router.patch('/book/updateBook/:id', bookController.updateBook)

router.delete('/book/deleteBook/:id', bookController.deleteBook)



module.exports = router