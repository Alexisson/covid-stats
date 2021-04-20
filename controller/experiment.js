import axios from "axios";
import Country from "../models/country.js";
import { getData } from "./getData.js";
import now from "performance-now";
async function experiment(countries, count, start) {
  let output_data = [];
  for (let i = start; i < count; i++) {
    try {
      const countryURL = countries[i].countryURLName;

      var t0 = now();
      const url = `https://www.worldometers.info/coronavirus/country/${countryURL}/`;
      const response = await axios.get(url);
      var t1 = now();
      var t2 = now();
      let countryRus = await Country.find({
        countryURLName: countryURL.toLowerCase(),
      });
      var t3 = now();
      const countryName = countryRus[0].countryNameEng;
      var t4 = now();
      let data = getData(response, countryName);
      var t5 = now();
      output_data.push({
        country: data.country,
        total: data.total,
        death: data.death,
        recover: data.recover,
        active: data.active,
      });
      console.log(
        (t1 - t0).toFixed(3),
        (t3 - t2).toFixed(3),
        (t5 - t4).toFixed(3)
      );
    } catch (error) {
      console.log(error);
    }
  }
  if (countries.length - count - count > 0)
    experiment(countries, count + count, start + count);
  else if (countries.length - count == 0) return;
  else experiment(countries, countries.length, count);
}

export default experiment;
