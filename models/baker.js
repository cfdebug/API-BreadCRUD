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

// HOOKS
bakerSchema.post('findOneAndDelete', function() {
    console.log(this._conditions._id)
    Bread.deleteMany({baker:`${this._conditions._id}`})
    .then(deleteStatus => {
        console.log(deleteStatus)
    })
    .catch(err => {
        console.log(err)
    })
})

const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker