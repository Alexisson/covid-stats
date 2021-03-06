import express from 'express';
import axios from 'axios';
import { getData } from '../controller/getData.js';
import Stat from '../models/stat.js';
import Country from '../models/country.js';
const router = express.Router();

router
    .all('/:country', async (req,res)=>{
        let country = req.params.country;
        if(country==='favicon.ico') return;
        country = country[0].toUpperCase()+country.slice(1);
        const url = `https://www.worldometers.info/coronavirus/country/${country}/`;      
        try {
            const response = await axios.get(url);
            let countryRus = await Country.find({countryURLName: country.toLowerCase()});
            const countryName = countryRus[0].countryNameEng;
            const oldStat = await Stat.find({country: countryName}).limit(1).sort({$natural:-1});
            let data = getData(response, countryName);
            if(data.total===0){
                res.render('404');
                return;
            }
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
                res.render('world',{
                    title: `Статистика по стране: ${data.country}`,
                    data,
                    pageTitle: countryRus[0].countryNameRus
                });
                console.log(`Данные по стране ${countryRus[0].countryNameRus} добавлены`);           
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
                    });
                    await newStat.save();
                    console.log(`Данные по стране ${countryRus[0].countryNameRus} обновлены`);
                    res.render('world',{
                        title: `Статистика по стране: ${data.country}`,
                        data,
                        pageTitle: countryRus[0].countryNameRus
                    });
                }
                else{
                    console.log(`Данные по стране ${countryRus[0].countryNameRus} актуальны`);
                    res.render('world',{
                        title: `Статистика по стране: ${data.country}`,
                        data: oldStat[0],
                        pageTitle: countryRus[0].countryNameRus
                    });
                } 
            }                  
        } catch (error) {
            console.log(error);
        }
    })
export default router;