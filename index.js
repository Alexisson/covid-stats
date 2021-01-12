
import express from 'express';
import world from './Router/world.js';
import home from './Router/home.js';
import settings from './Router/settings.js';
import exphbs from 'express-handlebars';
import Handlebars from 'handlebars';
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});


app
    .engine('hbs', hbs.engine)
    .set('view engine', 'hbs')
    .set('views', 'views')
    .use(express.static('public'))
    .use('/', home)
    .use('/country/', world)
    .use('/settings/', settings)
    .use((req,res,next)=>res.status(404).render('404'));


async function start() {
    try {
        const url = process.env.MONGO_URI;
        await mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true});
        app.listen(process.env.PORT||5000,()=>console.log(`Server is working on port ${process.env.PORT||5000}`));
    } catch (e) {
        console.log(e);
    }
}
start();


