import mongoose from 'mongoose';

const stat = new mongoose.Schema({
    country: String,
    date: String,
    time: String,
    total: Number,
    death: Number,
    recover: Number,
    active: Number

});

export default mongoose.model('Stat',stat);
