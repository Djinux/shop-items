const path = require('path')
const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const itemRoutes = require('./routes/item')
const orderRoutes = require('./routes/order')

const app = express()

// setting up app

app.set('view engine', 'ejs')
// set the directory where the template files are located
app.set('views', 'views')

// urlencoded default value is true, but we use body-parser
app.use(express.urlencoded({ extended: false }))
// telling express to search for static files like css in public directory
app.use(express.static(path.join(__dirname, 'public')))

app.use('/item', itemRoutes)
app.use('/order', orderRoutes)

// if falls through then url isn't correct - page not found
app.use(function (req, res, next) {
  const err = new Error('Page not found: ')
  err.status = 404
  next(err)
})

// let it fall through to error handler - render error.ejs
app.use(function (error, req, res, next) {
  console.error(error.stack)

  const statusCode = error.status || 500
  res.status(statusCode).render('error.ejs', {
    errorMessage: error.message,
    errorCode: statusCode,
  })
})

module.exports = app
