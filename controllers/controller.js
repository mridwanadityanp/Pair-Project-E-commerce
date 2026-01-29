const { log } = require('console')
const {Product, Profile, Purchase, User } = require('../models/index')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize');


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
        res.render('homeProduct', { dataProduct, session: req.session });

    } catch (error) {
        console.log("Error at homeProduct:", error);
        res.send(error);
    }
}

    /////////////////////////////////
    static async pageAddProduct(req,res){
        try {

            res.render('pageAddProduct')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async submitAddProduct(req,res){
        try {

            res.redirect('/product')
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
        // AMBIL buyerName dari form yang diisi user
        const { buyerName } = req.body; 

        const product = await Product.findByPk(productId);

        if (!product || product.stock <= 0) {
            return res.send("Maaf, stok sudah habis!");
        }

        // Kurangi stok
        await product.decrement('stock', { by: 1 });

        // PERBAIKAN: Kirim data ke EJS agar variabel <%= buyerName %> tidak error
        res.render('successPurchase', {
            buyerName: buyerName,    // Menghilangkan error di baris 93
            productName: product.title // Untuk menampilkan nama produk di kartu
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

            res.redirect('/products')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller
