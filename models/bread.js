// require mongoose 
const mongoose = require('mongoose')

// creating shorthand for the Schema constructor 
const { Schema } = mongoose 

const breadSchema = new Schema({
  name: {type: String, required: true},
  hasGluten: {type: Boolean},
  image: {type: String, default: '/images/favicon.ico'},
  ingredients: {type:Array},
  baker: {type: String, enum: ['Unknown', 'Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']}
})

const Bread = mongoose.model('Bread', breadSchema)


module.exports = Bread

