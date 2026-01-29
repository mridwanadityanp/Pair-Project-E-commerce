const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller.js')

router.get('/', Controller.homePage)
router.get('/login', Controller.loginPage)
router.get('/register', Controller.registerPage)
router.get('/product', Controller.homeProduct)
router.get('/product/add', Controller.addForm); //baru
router.post('/product/add', Controller.createProduct); //baru
router.get('/product/buy/:id', Controller.buyProduct); //baru
router.get('/notification', Controller.paymentNotif)

// router.get('/products/:id/edit')
// router.get('/purchase/:productId')


module.exports = router