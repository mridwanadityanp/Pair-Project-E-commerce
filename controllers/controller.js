const { log } = require('console')
const {Product, Profile, Purchase, User } = require('../models/index')
const bcrypt = require('bcryptjs')
const { Op,where} = require('sequelize');


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
        await User.create({
            email,
            password,
            role
        })
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
        
        let options = {
            order: [['createdAt', 'DESC']]
        };
        if (search) {
            options.where = {
                title: { 
                    [Op.iLike]: `%${search}%` 
                }
            };
        }
        const dataProduct = await Product.findAll(options);
        res.render('homeProduct', { dataProduct, session: req.session });
    } catch (error) {
        console.log("Error at homeProduct:", error);
        res.send(error);
    }
}
    static async pageAddProduct(req,res){
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
    static async deleteProduct(req,res){ 
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
    static async editPage(req,res){ //delete product
        try {
            let idProduct = req.params.id
            let product = await Product.findByPk(idProduct)
                      
            res.render('editPage', {idProduct, product} )
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async submitEdit(req,res){ //delete product
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
}

"halo"

module.exports = Controller
