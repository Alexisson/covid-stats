const express = require('express')
let world = require('./Router/world')
let home = require('./Router/home')
const app = express()



app
    .use('/', world)
    .use('/', home)
    .listen(process.env.PORT||5000,()=>console.log(`Server is working on port ${process.env.PORT||5000}`))