const express = require('express')
const axios = require('axios')
const getData = require('../controller/getData')
const fs = require('fs')
const Stat = require('../models/stat')


let router = express.Router()
const headersHTML = {'Content-Type':'application/json; charset=utf-8'}

router
    .all('/:country', async (req,res,next)=>{
        res.set(headersHTML)
        let country = req.params.country
        if(country==='favicon.ico') return
        country = country[0].toUpperCase()+country.slice(1)
        const url = `https://www.worldometers.info/coronavirus/country/${country}/`;
        
        try {
            const response = await axios.get(url)
            const oldStat = await Stat.find({country}).limit(1).sort({$natural:-1})
            let data = getData(response, country)
            if(oldStat.length===0){
                const newStat = new Stat({
                    country: data.country,
                    date: data.date,
                    time: data.time,
                    total: data.total,
                    death: data.death,
                    recover: data.recover,
                    active: data.active
                })
                await newStat.save()
                console.log(`Data for country ${country} has been added`)
            
            }
            else{
                if(oldStat[0].total!==data.total){
                    const newStat = new Stat({
                        country: data.country,
                        date: data.date,
                        time: data.time,
                        total: data.total,
                        death: data.death,
                        recover: data.recover,
                        active: data.active
                    })
                    await newStat.save()
                    console.log(`Data for country ${country} has been updated`)
                }
                else console.log(`Data for country ${country} is actual`)
            }          
            res.send(data)
            next()
        } catch (error) {
            console.log(error)
        }
        
    })


module.exports = router