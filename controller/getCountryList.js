const cheerio = require('cheerio')

const GetCountryList = (response) => {
    const $ = cheerio.load(response.data)
    let dataEng = []
    let dataRus = []
    let data = []
    let i = 1
    while(i){
        if(!$(`body > div.page_wrap > main > div.playlink > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text()) break
        dataEng.push($(`body > div.page_wrap > main > div.playlink > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text())
        i++
    }
    i = 1
    while(i){
        if(!$(`body > div.page_wrap > main > div.playlink > div > table > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text()) break
        dataRus.push($(`body > div.page_wrap > main > div.playlink > div > table > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text())
        i++
    }

    for(let i = 0; i<dataEng.length; i++){
        data.push({
            countryNameEng: dataEng[i],
            countryNameRus: dataRus[i],
            countryCode:''
        })
    }

    return data        
    }



module.exports=GetCountryList