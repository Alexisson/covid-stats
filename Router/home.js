import express from 'express';
import axios from 'axios';
import { getData } from '../controller/getData.js';
import { CountriesInColumns } from '../controller/countriesInColumns.js';
import Stat from '../models/stat.js';
import Country from '../models/country.js';
const router = express.Router();

router
    .all('/',async (req,res)=>{
        const url = 'https://www.worldometers.info/coronavirus/';
        const response = await axios.get(url);
        const oldStat = await Stat.find({country:"World"}).limit(1).sort({$natural:-1});
        const data = getData(response);
        if(oldStat.length===0){
            const newStat = new Stat({
                country: data.country,
                date: data.date,
                time: data.time,
                total: data.total,
                death: data.death,
                recover: data.recover,
                active: data.active
            });
            await newStat.save();
            console.log('Данные по миру добавлены');
        }
        else{
            if(oldStat[0].date === data.date){
                if(oldStat[0].time === data.time){
                    console.log('Данные по миру актуальны');
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
                    });
                    await newStat.save();
                    console.log('Данные по миру обновлены');
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
                console.log('Данные по миру обновлены')
            }
        }
        
        let countries = await Country.find().sort({countryNameRus:1});
        countries = CountriesInColumns(countries)
        res.render('home',{
            title: 'Главная страница',
            data,
            pageTitle: 'Статистика по миру',
            countriescol1: countries[0],
            countriescol2: countries[1],
            countriescol3: countries[2],
        });
    })
export default router;