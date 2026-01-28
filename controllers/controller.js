const { log } = require('console')
// const {  } = require('../models/index')

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

            res.render('homeProduct')
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