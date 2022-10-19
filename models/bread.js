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
  return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${this.baker.startDate.getFullYear()}`
}

breadSchema.statics.allBakedBy = function(baker) {
  return this.find({baker:baker.id})
  }

  
const Bread = mongoose.model('Bread', breadSchema)


module.exports = Bread

