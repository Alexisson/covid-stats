const express = require('express')
let world = require('./Router/world')
let home = require('./Router/home')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')

app
    .use('/', world)
    .use('/', home)
    .all(({res:r})=>r.status(404).send('Not Found'))


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


