const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller.js')
const { isLoggedIn, isAdmin, isBuyer } = require('../middlewares/middleware.js')


//per-login-an
router.get('/login', Controller.loginForm)
router.post('/login', Controller.login)
router.get('/register', Controller.registerForm)
router.post('/register', Controller.register)
router.get('/logout', Controller.logout)

router.get('/add', isLoggedIn, isAdmin, Controller.pageAddProduct)
router.post('/add', isLoggedIn, isAdmin, Controller.submitAddProduct)

router.get('/', Controller.homePage)
router.get('/products', Controller.homeProduct)

router.post('/:id/delete', isLoggedIn, isAdmin, Controller.deleteProduct)
router.post('/:productId/buy', isLoggedIn, isBuyer, Controller.buyProduct)


// router.get('/product/add', Controller.pageAddProduct)
// router.post('/product/add', Controller.submitAddProduct)
// router.get('/notification', Controller.paymentNotif)

// router.get('/products/:id/edit')
// router.get('/purchase/:productId')


// hanya admin boleh add product

// hanya admin boleh delete



module.exports = router