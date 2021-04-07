import express from "express";
import axios from "axios";
import { getData } from "../controller/getData.js";
import { CountriesInColumns } from "../controller/countriesInColumns.js";
import Stat from "../models/stat.js";
import Country from "../models/country.js";
import path from "path";
const router = express.Router();

router.all("/", async (req, res) => {
  // console.log(require.main.filename);
  const url = "https://www.worldometers.info/coronavirus/";
  const response = await axios.get(url);
  const oldStat = await Stat.find({ country: "World" })
    .limit(1)
    .sort({ $natural: -1 });
  const data = getData(response);
  let countries = await Country.find().sort({ countryNameRus: 1 });
  countries = CountriesInColumns(countries);
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
    res.render("home", {
      title: "Главная страница",
      data,
      pageTitle: "Статистика по миру",
      countriescol1: countries[0],
      countriescol2: countries[1],
      countriescol3: countries[2],
    });
    console.log("Данные по миру добавлены");
  } else {
    if (oldStat[0].date === data.date) {
      if (oldStat[0].time === data.time) {
        res.render("home", {
          title: "Главная страница",
          data: oldStat[0],
          pageTitle: "Статистика по миру",
          countriescol1: countries[0],
          countriescol2: countries[1],
          countriescol3: countries[2],
        });
        console.log("Данные по миру актуальны");
      } else {
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
        res.render("home", {
          title: "Главная страница",
          data,
          pageTitle: "Статистика по миру",
          countriescol1: countries[0],
          countriescol2: countries[1],
          countriescol3: countries[2],
        });
        console.log("Данные по миру обновлены");
      }
    } else {
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
      res.render("home", {
        title: "Главная страница",
        data,
        pageTitle: "Статистика по миру",
        countriescol1: countries[0],
        countriescol2: countries[1],
        countriescol3: countries[2],
      });
      console.log("Данные по миру обновлены");
    }
  }
});
export default router;
