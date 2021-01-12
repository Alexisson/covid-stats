import mongoose from 'mongoose';

const country = new mongoose.Schema({
    countryNameEng: String,
    countryNameRus: String,
    countryURLName: String,
    countryCode: String
});


export default mongoose.model('Country',country);