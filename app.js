const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes/index.js')
const session = require('express-session')


app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log('Server is running on localhost://3000')
})

app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'pair-project-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false // true kalo https
  }
}))

app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})

app.use(routes)
