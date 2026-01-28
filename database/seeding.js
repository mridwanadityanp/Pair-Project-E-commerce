const pool = require('./config.js')
const fs = require('fs').promises

async function seeding() {
    try {
        let author = await fs.readFile('./data/authors.json', 'utf8')
        author = JSON.parse(author)
        let loopAuthor = []
        for (let i = 0; i < author.length; i++) {
            const elementAuthor = author[i]
            loopAuthor.push(`('${elementAuthor.fullName}', '${elementAuthor.gender}')`) 
        }
        let insertAuthor = `INSERT INTO "Authors" ("fullName", "gender") values` + loopAuthor.join(',')

        let post = await fs.readFile('./data/posts.json', 'utf8')
        post = JSON.parse(post)
        let loopPost = []
        for (let i = 0; i < post.length; i++) {
            const elementPost = post[i]
            loopPost.push(`('${elementPost.title}', '${elementPost.difficulty}', '${elementPost.estimatedTime}', '${elementPost.description}', '${elementPost.totalVote}', '${elementPost.imageUrl}', '${elementPost.createdDate}', '${elementPost.AuthorId}')`)           
        }
        let insertPost = `INSERT INTO "Posts" ("title", "difficulty", "estimatedTime", "description", "totalVote", "imageUrl", "createdDate", "AuthorId") values` + loopPost.join(',')

        await pool.query(insertAuthor)
        await pool.query(insertPost)
        console.log('run seeding success!');
        
    } catch (error) {
        console.log(error)
    }
}

seeding()