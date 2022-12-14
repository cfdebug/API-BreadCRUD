const express = require('express')

// DEPENDENCIES
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},() => {console.log('Connected To Mongo: ',process.env.MONGO_URI)})


// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// Bakers
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// ROUTES
app.get('/', (req,res) => {
    // res.send('Welcome to an Awesome App about Breads!')
    res.redirect('/breads')
})

// 404 Page
app.get('*', (req,res) => {
    res.render('404')
})

// LISTEN
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})
