const {Schema, model} = require('mongoose')

const country = new Schema({
    countryNameEng: String,
    countryNameRus: String,
    countryURLName: String,
    countryCode: String


})


module.exports=model('Country',country)