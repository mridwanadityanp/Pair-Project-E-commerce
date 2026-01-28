const pool = require('./config.js')

async function migration() {
    try {
        let dropTable = `DROP TABLE IF EXISTS "Authors" , "Posts";`

        let tableAuthors = `CREATE TABLE IF NOT EXISTS "Authors" (
                                "id" SERIAL PRIMARY KEY,
                                "fullName" VARCHAR NOT NULL,
                                "gender" VARCHAR NOT NULL
                                );`
        let tablePosts = `CREATE TABLE IF NOT EXISTS "Posts" (
                            "id" SERIAL PRIMARY KEY,
                            "title" VARCHAR(100),
                            "difficulty" VARCHAR(6),
                            "estimatedTime" INTEGER,
                            "description" TEXT,
                            "totalVote" INTEGER DEFAULT 0,
                            "imageUrl" VARCHAR(100),
                            "createdDate" DATE,
                            "AuthorId" INTEGER,
                            CONSTRAINT "fk_AuthorId"
                                FOREIGN KEY("AuthorId")
                                    REFERENCES "Authors"("id")
                            );`
        await pool.query(dropTable)
        await pool.query(tableAuthors)
        await pool.query(tablePosts)
        console.log('success to create table on postgres!');


    } catch (error) {
        console.log(error);
        
    }
} 

migration()