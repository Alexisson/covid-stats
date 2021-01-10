const express = require('express')
const axios = require('axios')
const Country = require('../models/country')
const GetCountryList = require('../controller/getCountryList')
const getData = require('../controller/getData')
const router = express.Router()
const headersHTML = {'Content-Type':'application/json; charset=utf-8'}


router

    .all('/filtercountrylist/', async(req,res,next)=>{
        res.set(headersHTML)
        let countries = await Country.find()
        for(let i = 0; i<countries.length;i++){
            const country = countries[i].countryURLName
            const url = `https://www.worldometers.info/coronavirus/country/${country}/`
            const response = await axios.get(url)
            const data = getData(response, country)
            if(data.total==0) console.log(`${countries[i].countryNameEng} False`)
        }
        console.log('Finished')
        res.send(countries)
    })
    
    // For adding countries

    // .all('/getcountrylist', async (req,res)=>{
    //     res.set(headersHTML)
    //     const url = 'https://audio-class.ru/countries-with-capitals.php'
    //     const response = await axios.get(url)
    //     let data = GetCountryList(response)
    //     for(let i = 0; i < data.length; i++){
    //         const country = new Country({
    //             countryNameEng: data[i].countryNameEng,
    //             countryNameRus: data[i].countryNameRus,
    //             countryURLName: data[i].countryNameEng.toLowerCase().replace(' ','-').replace(' ','-'),
    //             countryCode: data[i].countryCode
    //         })
    //         await country.save()
    //         console.log(`Country ${data[i].countryNameEng} saved`)
    //     }
    //     res.send(data)
    // })



module.exports = router