const { log } = require('console')
const { Product,User,Pucrhase,Profile} = require('../models/index')
const { Op,where } = require('sequelize');
const { Session } = require('inspector');


class Controller {
    static async homePage(req,res){
        try {
            
            res.render('homePage')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async loginPage(req,res){
        try {

            res.render('loginPage')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async registerPage(req,res){
        try {

            res.render('registerPage')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async homeProduct(req,res){
        try {
    

      const dataProduct = await Product.findAll()
            res.render('homeProduct', {dataProduct, session:req.session})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    // Menampilkan Form Tambah (Hanya Admin)
  static addForm(req, res) {
    if (req.session.role !== 'admin') {
      return res.redirect('/product?error=Hanya admin yang boleh tambah produk');
    }
    res.render('addProduct');
  }

  // Proses Simpan Produk (Hanya Admin)
  static async createProduct(req, res) {
    try {
      const { title, imageURL, price, stock, marketName } = req.body;
      await Product.create({ title, imageURL, price, stock, marketName });
      res.redirect('/product');
    } catch (err) {
      res.send(err.message);
    }
  }

  // Proses Beli (Hanya User - Mengurangi Stok)
  static async buyProduct(req, res) {
    try {
      const { id } = req.params;
      if (req.session.role !== 'user') {
        return res.redirect('/product?error=Admin tidak boleh membeli');
      }
      
      const product = await Product.findByPk(id);
      if (product.stock > 0) {
        await product.decrement('stock', { by: 1 }); // Stok berkurang 1
        res.redirect('/product?success=Berhasil membeli ' + product.title);
      } else {
        res.redirect('/product?error=Stok habis');
      }
    } catch (err) {
      res.send(err.message);
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
}

module.exports = Controller
