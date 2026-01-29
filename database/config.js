const pg = require('pg')
const { Pool , Client } = pg

const pool = new Pool ({
    user: 'postgres',
    password: 'ridwancoding',
    host: 'localhost',
    port: 5432,
    database: 'DIYPlatform'
})


module.exports = pool