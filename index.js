const express = require('express')
let russia = require('./Router/russia')
const app = express()



app
    .use('/', russia)
    .all('/', async r=>{r.res.send('Home page')})
    .listen(process.env.PORT||5000,()=>console.log(`Server is working on port ${process.env.PORT||5000}`))