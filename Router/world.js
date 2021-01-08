const express = require('express')
const axios = require('axios')

// let getDataRus = require('../controller/russia/getData')
// let getDateRus = require ('../controller/russia/getDate')


let router = express.Router()
const headersHTML = {'Content-Type':'application/json; charset=utf-8'}

router
    .all('/:country', async r=>{
        r.res.set(headersHTML);
        r.res.send('Country stats')
    })


module.exports = router