import express from "express";
import axios from "axios";
import { getData } from "../controller/getData.js";
import { GetCountryList } from "../controller/getCountryList.js";
import Country from "../models/country.js";
import Stat from "../models/stat.js";
import ObjectsToCsv from "objects-to-csv";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

dotenv.config();
const router = express.Router();

router
  .all("/filtercountrylist/", async (req, res, next) => {
    let countries = await Country.find();
    for (let i = 0; i < countries.length; i++) {
      const country = countries[i].countryURLName;
      const url = `https://www.worldometers.info/coronavirus/country/${country}/`;
      const response = await axios.get(url);
      const data = getData(response, country);
      if (data.total == 0) console.log(`${countries[i].countryNameEng} False`);
    }
    console.log("Finished");
    res.send(countries);
  })
  .all("/getstatisticscsv", async (req, res, next) => {
    console.log("Process start...");
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pathToCsv = path.join(__dirname, "..");
    let output_data = [];
    let countries = await Country.find().sort({ countryNameRus: 1 });
    for (let i = 0; i < countries.length; i++) {
      try {
        const countryURL = countries[i].countryURLName;
        const url = `https://www.worldometers.info/coronavirus/country/${countryURL}/`;
        const response = await axios.get(url);
        let countryRus = await Country.find({
          countryURLName: countryURL.toLowerCase(),
        });
        const countryName = countryRus[0].countryNameEng;
        let data = getData(response, countryName);
        output_data.push({
          country: data.country,
          total: data.total,
          death: data.death,
          recover: data.recover,
          active: data.active,
        });
      } catch (error) {
        console.log(error);
      }
    }
    const filename = `COVID-19_Dataset_${Date.now()}.csv`;
    try {
      (async () => {
        const csv = new ObjectsToCsv(output_data);
        await csv.toDisk(`./results/${filename}`);
        const file = `${pathToCsv}/results/${filename}`;
        res.render("getstatisticscsv", {
          title: "Экспорт в CSV",
          file,
        });
      })();
    } catch (error) {
      console.log(error);
    }
  })
  .all("/globalupdate/", async (req, res, next) => {
    console.log("Process start...");
    let countries = await Country.find().sort({ countryNameRus: 1 });
    for (let i = 0; i < countries.length; i++) {
      try {
        const countryURL = countries[i].countryURLName;
        const response = await axios.get(
          `https://www.worldometers.info/coronavirus/country/${countryURL}/`
        );
        let countryRus = await Country.find({
          countryURLName: countryURL.toLowerCase(),
        });
        const countryName = countryRus[0].countryNameEng;
        const oldStat = await Stat.find({ country: countryName })
          .limit(1)
          .sort({ $natural: -1 });
        let data = getData(response, countryName);
        if (oldStat.length === 0) {
          const newStat = new Stat({
            country: data.country,
            date: data.date,
            time: data.time,
            total: data.total,
            death: data.death,
            recover: data.recover,
            active: data.active,
          });
          await newStat.save();
          console.log(
            `Данные по стране ${countryRus[0].countryNameRus} добавлены`
          );
        } else {
          if (oldStat[0].total !== data.total) {
            const newStat = new Stat({
              country: data.country,
              date: data.date,
              time: data.time,
              total: data.total,
              death: data.death,
              recover: data.recover,
              active: data.active,
            });
            await newStat.save();
            console.log(
              `Данные по стране ${countryRus[0].countryNameRus} обновлены`
            );
          } else
            console.log(
              `Данные по стране ${countryRus[0].countryNameRus} актуальны`
            );
        }
      } catch (error) {
        console.log(error);
      }
    }
    res.render("globalupdate");
  });

// For adding countries

// .all('/getcountrylist', async (req,res)=>{
//     res.set(headersHTML);
//     const url = 'https://audio-class.ru/countries-with-capitals.php';
//     const response = await axios.get(url);
//     let data = GetCountryList(response);
//     for(let i = 0; i < data.length; i++){
//         const country = new Country({
//             countryNameEng: data[i].countryNameEng,
//             countryNameRus: data[i].countryNameRus,
//             countryURLName: data[i].countryNameEng.toLowerCase().replace(' ','-').replace(' ','-'),
//             countryCode: data[i].countryCode
//         });
//         await country.save();
//         console.log(`Country ${data[i].countryNameEng} saved`);
//     }
//     res.send(data);
// })

export default router;
