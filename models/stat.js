const {Schema, model} = require('mongoose')

const stat = new Schema({
    country: String,
    date: String,
    time: String,
    total: Number,
    death: Number,
    recover: Number,
    active: Number

})


module.exports=model('Stat',stat)
