const express = require('express')
const axios = require('axios')
const getData = require('../controller/getData')
const Stat = require('../models/stat')
let router = express.Router()
const Country = require('../models/country')
const CountriesInColumns = require('../controller/countriesInColumns')
const headersHTML = {'Content-Type':'text/html; charset=UTF-8'}

router
    .all('/',async (req,res)=>{

        const url = 'https://www.worldometers.info/coronavirus/';
        const response = await axios.get(url)
        const oldStat = await Stat.find({country:"World"}).limit(1).sort({$natural:-1})
        
        let data = getData(response)
        if(oldStat[0].date === data.date){
            if(oldStat[0].time === data.time){
                console.log('Data is actual')
            }
            else{
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
                console.log('Data has been updated')
            }
        }
        else{
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
            console.log('Data has been updated')
        }
        let countries = await Country.find().sort({countryNameRus:1})
        countries = CountriesInColumns(countries)
        res.render('home',{
            title: 'Главная страница',
            data,
            pageTitle: 'Статистика по миру',
            countriescol1: countries[0],
            countriescol2: countries[1],
            countriescol3: countries[2],
        })
    })


module.exports = router