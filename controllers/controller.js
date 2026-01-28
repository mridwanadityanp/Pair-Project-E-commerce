
const Model = require('../models/model.js')

class Controller {
    static async landing(req, res){
        try {
            res.render('landing.ejs')

        } catch (error) {
            res.send(error)
        }
    }
    static async authorPage(req, res){
        try {
            let data = await Model.authors()
            let dataToView = {data}
            res.render('authorpage.ejs', dataToView)

        } catch (error) {
            res.send(error)
        }
    }
    static async postpage(req, res){
        try {
            let searchBar = req.query.search
            let data = await Model.posts(searchBar)
            let dataToView = {data}
            res.render('postpage.ejs', dataToView)

        } catch (error) {
            res.send(error)
        }
    }
     static async authorDetail(req, res){
        try {
            let data = await Model.authorsDetail()
            let dataToView = {data}
            res.render('authordetail.ejs', dataToView)

        } catch (error) {
            res.send(error)
        }
    }
     static async readMore(req, res){
        try {
            let idPost = req.params.id
            let data = await Model.readMore(idPost)
            let dataToView = {data}
            res.render('postdetail.ejs', dataToView)
           
        } catch (error) {
            res.send(error)
        }
    }
    static async deletePost(req, res){
        try {
            let idPost = req.params.id
            await Model.deletePost(idPost)
            res.redirect('/posts')

        } catch (error) {
            res.send(error)
        }
    }
    static async voteButton(req, res){
        try {
            let idPost = req.params.id
            await Model.voteButton(idPost)
            res.redirect(`/posts/${idPost}`)

        } catch (error) {
            res.send(error)
        }
    }
    static async addPage(req,res) {
        try {
            let errorsArray = [];
            if(req.query.errorMessages) {
                errorsArray = req.query.errorMessages.split(',')
            }
            let data = await Model.authors()
            let dataToView = {data, errorsArray}
            res.render('addpage.ejs', dataToView)
 
        } catch (error) {
            res.send(error)
            console.log(error);
            
        }
    }
    static async submitPage(req,res) {
        try {
            let newPost = req.body
            await Model.addPost(
                newPost.title,
                newPost.author,
                newPost.difficulty,
                newPost.estimatedTime,
                newPost.imageUrl,
                newPost.createdDate,
                newPost.description
            )
            res.redirect(`/posts`)
 
        } catch (error) {
            if(error.message === 'errorValidation') {
                res.redirect(`/posts/add?errorMessages=${error.errorMessages.join(',')}`)
            } else {
                res.send(error)
                console.log(error);
            }
        }
    }
    static async editPage(req,res) {
        try {
            let errorsArray = [];
            if(req.query.errorMessages) {
                errorsArray = req.query.errorMessages.split(',')
            }
            let idPost = req.params.id
            let post = await Model.readMore(idPost)
            let author = await Model.authors()
            let dataToView = {author, post, errorsArray}
            res.render('editpage.ejs', dataToView)

        } catch (error) {
            res.send(error)
        }
    }
    static async submitEdit(req,res) {
        try {
            let idPost = req.params.id
            let newPost = req.body
            await Model.submitEdit(
                idPost,
                newPost.title,
                newPost.author,
                newPost.difficulty,
                newPost.estimatedTime,
                newPost.imageUrl,
                newPost.createdDate,
                newPost.description
            )
            res.redirect(`/posts`)
 
        } catch (error) {
            if(error.message === 'errorValidation') {
                res.redirect(`/posts/${req.params.id}/edit?errorMessages=${error.errorMessages.join(',')}`)
            } else {
                res.send(error)
                console.log(error);
            }
            
        }
    }
}

module.exports = Controller