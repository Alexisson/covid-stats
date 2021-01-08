const express = require('express')
const axios = require('axios')
const getData = require('../controller/getData')



let router = express.Router()
const headersHTML = {'Content-Type':'application/json; charset=utf-8'}

router
    .all('/',async r=>{
        r.res.set(headersHTML);
        const url = 'https://www.worldometers.info/coronavirus/';
        const response = await axios.get(url);
        r.res.send(getData(response))
    })


module.exports = router