const express = require('express')
const router = express.Router()
const authorRouter = require('./author.route.js')
const postRouter = require('./post.route.js')


const Controller = require('../controllers/controller.js')

router.get('/', Controller.landing)
router.use('/authors', authorRouter)
router.use('/posts', postRouter)


module.exports = router