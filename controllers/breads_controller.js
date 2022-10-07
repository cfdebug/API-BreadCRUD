const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
  Bread.find().then(foundBreads => {
  res.render('index',
  {
    breads: foundBreads,
    title: 'Index Page'
  }
  )
})
})

// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
  res.render('edit', {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray
  })
})

// SHOW
breads.get('/:id', (req, res) => {
  console.log(req.params.id)
  Bread.findById(req.params.id)
    .then(foundBread => {
      res.render('show', {
        bread: foundBread
      })
    }).catch(err => {res.render('404')})
  })

// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  if (!req.body.ingredients) {
    req.body.ingredients = ['Ingredients not listed']
  }else {
    let arr = req.body.ingredients.split(',')
    req.body.ingredients = arr
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// DELETE
breads.delete('/:indexArray', (req, res) => {
  Bread.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})

// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  if (!req.body.ingredients) {
    req.body.ingredients = ['Ingredients not listed']
  }else {
    let arr = req.body.ingredients.split(',')
    req.body.ingredients = arr
  }
  Bread[req.params.arrayIndex] = req.body
  res.redirect(`/breads/${req.params.arrayIndex}`)
})

  

module.exports = breads
