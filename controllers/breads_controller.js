const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Seed = require('../models/seed.js')
const Baker = require('../models/baker.js')

// // INDEX
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean()
  const foundBreads = await Bread.find().populate('baker').limit(10)
    res.render('index',
    {
      breads: foundBreads,
      title: 'Index Page',
      bakers: foundBakers
    }
    )
  })

// NEW
breads.get('/new', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      res.render('new', {bakers:foundBakers})
    })
})

// NEW - MANY
breads.get('/data/seed', (req, res) => {
  Bread.insertMany(Seed)
  .then(createdBread => {
    res.redirect('/breads')
  })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
  .then(foundBakers => {
    Bread.findById(req.params.id)
    .then(foundBread => {
      res.render('edit', {
        bread: foundBread,
        bakers: foundBakers
      })
    })
  })
})

// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    .populate('baker')
    .then(foundBread => {
      Bread.allBakedBy(foundBread.baker)
      .then(allBreads => {
        res.render('show', {
          bread: foundBread,
          breadList: allBreads
        })
      })
    }).catch(err => {
      res.render('404')
    })
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
  if (!req.body.baker) {
    req.body.baker = 'Unknown'
  }
  Bread.create(req.body)
  .then(newBread => {
    res.redirect('/breads')
  })
  .catch(err => {
    res.render('404')
  })
  
})

// CREATE MANY

// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
  .then(deletedBread => {
    res.status(303).redirect('/breads')
  })
  .catch(err => {
    res.render('404')
  })
  
})

// UPDATE
breads.put('/:id', (req, res) => {
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
  if (!req.body.baker) {
    req.body.baker = 'Unknown'
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, {new: true , runValidators: true})
  .then(updatedBread => {
    res.redirect(`/breads/${req.params.id}`) 
  })
  .catch(err => {
    res.render('404')
  })
  
})

  

module.exports = breads
