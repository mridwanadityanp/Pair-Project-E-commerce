const { log } = require('console')
const {Product, Profile, Purchase, User } = require('../models/index')
const bcrypt = require('bcryptjs');
const { title } = require('process');
const { Op } = require('sequelize')
const formatMoney = require('../helpers/currency')

class Controller {
    static async loginForm(req, res) {  //form login
        try {
            
             res.render('loginPage')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async login(req, res) {  //proses login
        try {
            const { email, password } = req.body

            console.log("LOGIN INPUT:", email)

            const user = await User.findOne({ where: { email } })

            if (!user) {
            console.log("USER NOT FOUND")
            return res.redirect('/login')
            }

            const isValid = bcrypt.compareSync(password, user.password)

            if (!isValid) {
            console.log("PASSWORD WRONG")
            return res.redirect('/login')
            }

            req.session.userId = user.id
            req.session.role = user.role

            console.log("LOGIN SUCCESS")

            return res.redirect('/products')

        } catch (err) {
            console.log("LOGIN ERROR:", err)
            res.send(err)
        }
    }
    static async registerForm(req, res) {  //form register
        try {
            
             res.render('registerPage')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async register(req, res) { //proses register
        try {
        const { email, password, role } = req.body

        // basic validation
        if (!email || !password || !role) {
            return res.send('All fields are required')
        }

        // create user (password di-hash oleh model hook)
        await User.create({
            email,
            password,
            role
        })

        // redirect ke login setelah sukses
        res.redirect('/login')

        } catch (err) {
        console.log('REGISTER ERROR:', err)
        res.send(err)
        }
    }

        static logout(req, res) { //logout
            req.session.destroy(() => {
            res.redirect('loginPage')
            })
        }

    static async homePage(req,res){ //page awaall
            try {
                res.render('homePage')
            } catch (error) {
                console.log(error);
                res.send(error)
            }
        }
    

    static async homeProduct(req, res) {
        try {
            const { search } = req.query;
            
            // 1. Definisikan options dasar
            let options = {
                // include: Purchase,
                order: [['createdAt', 'DESC']]
            };

            // 2. Tambahkan logika filter jika ada search query
            if (search) {
                options.where = {
                    title: { 
                        // Perbaikan: Gunakan backticks (`) dan tanda petik untuk query SQL
                        [Op.iLike]: `%${search}%` 
                    }
                };
            }

            // 3. Masukkan 'options' ke dalam findAll agar filter bekerja
            const dataProduct = await Product.findAll(options);

            // 4. Kirim dataProduct DAN session (supaya tombol di EJS tidak error)
            res.render('homeProduct', { formatMoney, dataProduct, session: req.session });

        } catch (error) {
            console.log("Error at homeProduct:", error);
            res.send(error);
        }
    }

    static async pageAdd(req,res){
        try {
            res.render('pageAdd')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async submitAdd(req,res){
        try {
            await Product.create({ 
                title: req.body.title, //'name' itu mention dari 'name' di ejs
                storeName: req.body.storeName,
                price: req.body.price,
                stock: req.body.stock,
                imageURL: req.body.imageURL,
                BuyerId: req.session.userId 
            });
            res.redirect('/products')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async buyProduct(req, res) {
            try {
                const { productId } = req.params;
                const product = await Product.findByPk(productId);
                
                if (!product) return res.send("Produk tidak ditemukan");
                
                res.render('buyForm', { product, session: req.session });
        } catch (error) {
            res.send(error);
        }
    }

    static async submitPurchase(req, res) {
        try {
            const { productId } = req.params;
            const { buyerName } = req.body; 

            const product = await Product.findByPk(productId);
            if (!product || product.stock <= 0) {
                return res.render('outOfStock');
            }
            await product.decrement('stock', { by: 1 });

            res.render('successPurchase', {
                buyerName: buyerName,   
                productName: product.title 
            });

        } catch (error) {
            console.error(error);
            res.send("Terjadi kesalahan: " + error.message);
        }
    }
    static async paymentNotif(req,res){
        try {

            res.render('paymentNotif')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async deleteProduct(req,res){ //delete product
        try {
            await Product.destroy({
                where: {
                    id: req.params.id,
                },
            })
            res.redirect(`/products`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async editPage(req,res){ //edit product
        try {
            let idProduct = req.params.id
            let product = await Product.findByPk(idProduct)
                      
            res.render('editPage', {idProduct, product} )
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async submitEdit(req,res){ //submit edit
        try {
             await Product.update({
            title: req.body.title,
            storeName: req.body.storeName,
            price: req.body.price,
            stock: req.body.stock,
            imageURL: req.body.imageURL
        },
        {
            where: {
            id: req.params.id
            }
        }
        )
        res.redirect(`/products`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static logout(req, res) {
        req.session.destroy((error) => {
            if(error) {
                res.send(error)
            } else {
                res.redirect('/')
            }
        })
    }
}

module.exports = Controller
