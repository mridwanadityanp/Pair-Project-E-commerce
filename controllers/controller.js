const { log } = require('console')
const {Product, Profile, Purchase, User } = require('../models/index')
const bcrypt = require('bcryptjs')


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
    static async homeProduct(req,res){ //home produkk
        try {
    //         const { search } = req.query;
    //   let options = {
    //     include: User, 
    //     order: [['createdAt', 'DESC']]
    //   };

    //   if (search) {
    //     options.where = {
    //       title: { [Op.iLike]: %${search}% } 
    //     };
    //   }

    const dataProduct = await Product.findAll()
            res.render('homeProduct', {dataProduct})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
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
    static async buyProduct(req,res){
        try {

            res.render('/:productId/buy')
        } catch (error) {
            console.log(error);
            res.send(error)
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
