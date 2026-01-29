const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller.js')
const { isLoggedIn, isAdmin, isBuyer } = require('../middlewares/middleware.js')


router.get('/', Controller.homePage)
router.get('/products', Controller.homeProduct)
//per-login-an
router.get('/login', Controller.loginForm)
router.post('/login', Controller.login)
router.get('/register', Controller.registerForm)
router.post('/register', Controller.register)
router.get('/logout', Controller.logout)
router.get('/purchase/:productId/buy', Controller.buyProduct); // Menampilkan form
router.post('/purchase/:productId/buy', Controller.submitPurchase); // Proses simpan & update stok

router.get('/products/add', isAdmin, Controller.pageAdd)
router.post('/products/add', isAdmin, Controller.submitAdd)
router.get('/products/:id/edit', isAdmin, Controller.editPage)
router.post('/products/:id/edit', isAdmin, Controller.submitEdit)
router.post('/products/:id/delete', isAdmin, Controller.deleteProduct)


router.post('/:productId/buy', isLoggedIn, isBuyer, Controller.buyProduct)


// router.get('/product/add', Controller.pageAddProduct)
// router.post('/product/add', Controller.submitAddProduct)
// router.get('/notification', Controller.paymentNotif)

// router.get('/products/:id/edit')
// router.get('/purchase/:productId')


// hanya admin boleh add product

// hanya admin boleh delete



module.exports = router