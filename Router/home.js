const express = require('express')
const axios = require('axios')
const getData = require('../controller/getData')


let router = express.Router()
const headersHTML = {'Content-Type':'application/json; charset=utf-8'}

router
    .all('/',async (req,res,next)=>{
        res.set(headersHTML);
        const url = 'https://www.worldometers.info/coronavirus/';
        const response = await axios.get(url)
        res.send(getData(response))
        next()
    })


module.exports = router