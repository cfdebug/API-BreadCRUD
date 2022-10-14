const mongoose = require('mongoose')
const Bread = require('./bread.js')

// creating shorthand for the Schema constructor 
const { Schema } = mongoose 

const bakerSchema = new Schema({
    name: {type:String, required:true, enum: ['Unknown', 'Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']},
    startDate: {type:Date, required:true},
    bio: {type:String}
},{toJSON: {virtuals:true}})

// Virtuals
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})

const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker