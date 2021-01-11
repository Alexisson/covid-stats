const express = require('express')
let world = require('./Router/world')
let home = require('./Router/home')
let settings = require('./Router/settings')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app
    .engine('hbs', hbs.engine)
    .set('view engine', 'hbs')
    .set('views', 'views')

    .use(express.static('public'))
    
    .use('/', home)
    .use('/country/', world)
    .use('/settings/', settings)
    
    // .all(({res:r})=>r.status(404).render('404'))


async function start() {
    try {
        const url = process.env.MONGO_URI
        await mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true})
        app.listen(process.env.PORT||5000,()=>console.log(`Server is working on port ${process.env.PORT||5000}`))
    } catch (e) {
        console.log(e)
    }
    
}
start()


