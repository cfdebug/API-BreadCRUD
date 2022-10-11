// require mongoose 
const mongoose = require('mongoose')

// creating shorthand for the Schema constructor 
const { Schema } = mongoose 

const breadSchema = new Schema({
  name: {type: String, required: true},
  hasGluten: {type: Boolean},
  image: {type: String, default: '/images/favicon.ico'},
  ingredients: {type:Array},
  baker: {type: Schema.Types.Object, ref: 'Baker'}
})

// Helper Methods
breadSchema.methods.getBakedBy = function() {
  return `${this.name} was baked with love by ${this.baker}`
}

breadSchema.statics.allBakedBy = function(name) {
  return this.find({baker:name})
  }

  
const Bread = mongoose.model('Bread', breadSchema)


module.exports = Bread

