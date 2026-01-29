const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller.js')
const { isLoggedIn, isAdmin, isBuyer } = require('../middlewares/middleware.js')
router.get('/login', Controller.loginForm)
router.post('/login', Controller.login)
router.get('/register', Controller.registerForm)
router.post('/register', Controller.register)
router.get('/logout', Controller.logout)
router.get('/purchase/:productId/buy', Controller.buyProduct); // Menampilkan form
router.post('/purchase/:productId/buy', Controller.submitPurchase); // Proses simpan & update stok
router.get('/add', isLoggedIn, isAdmin, Controller.pageAddProduct)
router.post('/add', isLoggedIn, isAdmin, Controller.submitAddProduct)
router.get('/', Controller.homePage)
router.get('/products', Controller.homeProduct)
router.post('/:id/delete', isLoggedIn, isAdmin, Controller.deleteProduct)
router.post('/:productId/buy', isLoggedIn, isBuyer, Controller.buyProduct)


module.exports = router