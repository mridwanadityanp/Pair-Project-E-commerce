const express = require('express')
const router = require('./routes/index.route')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(router)
app.listen(port, function(){console.log(`website is running on port ${port}`);
})

