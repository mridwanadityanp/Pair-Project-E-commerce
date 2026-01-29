const express = require('express')
const authorRouter = express.Router()

const Controller = require('../controllers/controller.js')

authorRouter.get('/', Controller.authorPage)
authorRouter.get('/detail', Controller.authorDetail)

module.exports = authorRouter