const express = require('express')
<<<<<<< HEAD
const app = express()
const PORT = 3000
const routes = require('./routes/index.js')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
    console.log('Server is running on localhost://3000')
=======
const router = require('./routes/index.route')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(router)
app.listen(port, function(){console.log(`website is running on port ${port}`);
>>>>>>> 08765b02c30f373fa909e631353fe0cd621578b2
})

