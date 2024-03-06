const express = require('express')
const router = express.Router()
const author = require('../Controller/AuthorController')

router.post('/author/postAuthor', author.postOneAuthor)

router.get('/author/getAuthor', author.getAllAuthor)

router.post('/author/postAuthor', author.postOneAuthor)

router.get('/author/getAuthor/:id', author.getOneAuthor)

router.patch('/author/updateAuthor/:id', author.updateAuthor)

router.delete('/author/deleteAuthor/:id', author.deleteAuthor)


module.exports = router