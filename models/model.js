const {Author, AuthorDetail, Post, PostDetail} = require('./class.js')
const pool = require('../database/config.js')
const { log } = require('node:console')

class Model {
    static async authors() {
        try {
            let data = `SELECT "Authors".*  
                        FROM "Authors"
                        ORDER BY "Authors"."id"`
            let queryResult = await pool.query(data)

            let queryInstance = []
            for (let i = 0; i < queryResult.rows.length; i++) {
                const elementQuery = queryResult.rows[i];
                queryInstance.push(new Author(elementQuery.id, elementQuery.fullName, elementQuery.gender))
            }
            return queryInstance
            // console.log(queryInstance);


        } catch (error) {
            throw error
        }

    }
static async authorsDetail() {
        try {
           let data = `SELECT "Authors".*, COUNT("Posts"."id") AS "totalPost", SUM("Posts"."totalVote") AS "totalVote", CAST(AVG("Posts"."estimatedTime") AS DECIMAL(10, 1)) AS "averageTime"
                        FROM "Authors"
                        LEFT JOIN "Posts" ON "Authors"."id" = "Posts"."AuthorId"       
                        GROUP BY "Authors"."id", "Authors"."fullName", "Authors"."gender"
                        ORDER BY "Authors"."id"`
            let queryResult = await pool.query(data)

            let queryInstance = []
            for (let i = 0; i < queryResult.rows.length; i++) {
                const elementQuery = queryResult.rows[i];
                queryInstance.push(new AuthorDetail(elementQuery.id, elementQuery.fullName, elementQuery.gender, Number(elementQuery.totalPost), Number(elementQuery.totalVote), Number(elementQuery.averageTime)))
            }
            return queryInstance
            // console.log(queryInstance);

        } catch (error) {
            console.log(error);
        }

    }
    static async posts(searchBar) {
        try {
            let searchBarResult = ""
            if ( searchBar ){
                searchBarResult = `WHERE "Posts"."title" ilike '%${searchBar}%' ` 
            }
            let data = `SELECT "Posts"."id", "Posts"."title", "Posts"."difficulty", "Posts"."totalVote"
                        FROM "Posts"
                        ${searchBarResult} ORDER BY "Posts"."totalVote" DESC`
            let queryResult = await pool.query(data)

            let queryInstance = []
            for (let i = 0; i < queryResult.rows.length; i++) {
                const elementQuery = queryResult.rows[i];
                queryInstance.push(new Post(elementQuery.id, elementQuery.title, elementQuery.difficulty, elementQuery.totalVote))
            }
            return queryInstance

        } catch (error) {
            throw error
        }

    }
    static async readMore(idPost) {
        try {
           let data = `SELECT "Posts".*, "Authors"."fullName" 
                        FROM "Authors"
                        INNER JOIN "Posts" ON "Authors"."id" = "Posts"."AuthorId"
                        WHERE "Posts"."id" = ${idPost};`
            let queryResult = await pool.query(data)

            // let queryInstance = []
            // for (let i = 0; i < queryResult.rows.length; i++) {
            //     const elementQuery = queryResult.rows[i];
            //     queryInstance.push(new AuthorDetail(elementQuery.id, elementQuery.fullName, elementQuery.gender, Number(elementQuery.totalPost), Number(elementQuery.totalVote), Number(elementQuery.averageTime)))
            // }
            let queryInstance = queryResult.rows[0]
            return new PostDetail(
                queryInstance.id, 
                queryInstance.title, 
                queryInstance.difficulty, 
                queryInstance.totalVote, 
                queryInstance.estimatedTime, 
                queryInstance.description, 
                queryInstance.imageUrl, 
                queryInstance.createdDate, 
                queryInstance.AuthorId, 
                queryInstance.fullName
            )
            
        } catch (error) {
            throw error
        }

    }

    static async addPost(title, author, difficulty, estimatedTime, imageUrl, createdDate, description) {
        try {
        this.validation(title, author, difficulty, estimatedTime, imageUrl, createdDate, description)

        let data = `INSERT INTO "Posts" ("title", "difficulty", "estimatedTime", "description", "imageUrl", "createdDate", "AuthorId")
                    values ('${title}', '${difficulty}', '${estimatedTime}', '${description}', '${imageUrl}', '${createdDate}', '${author}')`
            await pool.query(data)
            return true

        } catch (error) {
            throw error
        }
    }
    static async submitEdit(idPost, title, author, difficulty, estimatedTime, imageUrl, createdDate, description) {
        try {
        this.validation(title, author, difficulty, estimatedTime, imageUrl, createdDate, description)

        let data = `UPDATE "Posts"
                    SET "title" = '${title}',
                    "AuthorId" = '${author}', 
                    "difficulty" = '${difficulty}',
                    "estimatedTime" = '${estimatedTime}',
                    "imageUrl" = '${imageUrl}',
                    "createdDate" = '${createdDate}',
                    "description" = '${description}'
                    WHERE "Posts"."id" = ${idPost};`
            await pool.query(data)
            return true

        } catch (error) {
            throw error
        }
    }
    static async deletePost(idPost) {
        try {
            let data = `DELETE FROM "Posts" 
                        WHERE "Posts"."id" = ${idPost};`
            await pool.query(data)
            return true

        } catch (error) {
            throw error
        }

    }
    static async voteButton(idPost) {
        try {
            let data = `UPDATE "Posts"
                        SET "totalVote" = "totalVote" + 1 
                        WHERE "Posts"."id" = ${idPost};`
            await pool.query(data)
            return true

        } catch (error) {
            throw error
        }
    }
    static validation(title, author, difficulty, estimatedTime, imageUrl, createdDate, description) {
        let errorMessages = [] 
        if (!title){
            errorMessages.push('Title is required')
        }
        if (!author){
            errorMessages.push('Author is required')
        }
        if (!difficulty){
            errorMessages.push('Difficulty is required')
        }
        if (!estimatedTime){
            errorMessages.push('Estimated Time is required')
        }
        if (!imageUrl){
            errorMessages.push('Image URL is required')
        }
        if (!createdDate){
            errorMessages.push('Created Date is required')
        }
        if (!description){
            errorMessages.push('Description is required')
        }
        if (estimatedTime < 5){
            errorMessages.push('Minimun estimated time is 5 minutes')
        }
        if (title.length > 100){
            errorMessages.push('Post title maximum character is 100')
        }
        if (imageUrl.length > 100){
            errorMessages.push('Image URL name maximum character is 100')
        }
        if (new Date(createdDate) > new Date()){
            errorMessages.push('Minimun created date is today')
        }
        if (description.length < 10){
            errorMessages.push('Minimum word in description is 10')
        }
        
        if (errorMessages.length > 0){
            throw {
                message: 'errorValidation', 
                errorMessages
            }
        }
        return []
    }
}

 module.exports = Model
