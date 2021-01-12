
import express from 'express';
import world from './Router/world.js';
import home from './Router/home.js';
import settings from './Router/settings.js';
import exphbs from 'express-handlebars';
import Handlebars from 'handlebars';
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import favicon from 'serve-favicon';
import path from 'path';

dotenv.config();
const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});
const __dirname = path.resolve();

app
    .engine('hbs', hbs.engine)
    .set('view engine', 'hbs')
    .set('views', 'views')
    .use(favicon(path.join(__dirname,'public','images','favicon.ico')))
    .use(express.static('public'))
    .use('/', home)
    .use('/country/', world)
    .use('/settings/', settings)
    .use(r=>r.res.status(404).render('404'));


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


