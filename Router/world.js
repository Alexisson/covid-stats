const express = require('express')
const axios = require('axios')
const getData = require('../controller/getData')
// let getDataRus = require('../controller/russia/getData')
// let getDateRus = require ('../controller/russia/getDate')


let router = express.Router()
const headersHTML = {'Content-Type':'application/json; charset=utf-8'}

router
    .all('/:country', async (req,res,next)=>{
        res.set(headersHTML)
        const country = req.params.country
        const url = `https://www.worldometers.info/coronavirus/country/${country}/`;
        const response = await axios.get(url,)
        res.send(getData(response, country))
        next()

    })


module.exports = router