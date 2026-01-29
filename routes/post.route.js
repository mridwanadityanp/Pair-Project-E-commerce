const express = require('express')
const postRouter = express.Router()
const Controller = require('../controllers/controller.js')

postRouter.get('/', Controller.postpage)
postRouter.get('/add', Controller.addPage)
postRouter.post('/add', Controller.submitPage)
postRouter.get('/:id', Controller.readMore)
postRouter.get('/:id/delete', Controller.deletePost)
postRouter.get('/:id/vote', Controller.voteButton)
postRouter.get('/:id/edit', Controller.editPage)
postRouter.post('/:id/edit', Controller.submitEdit)



module.exports = postRouter