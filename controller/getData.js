import cheerio from 'cheerio';
import { Today } from './getDate.js';
import { UTCTime } from './getUTCTime.js';
import { ParseDateTime } from './parseDateTime.js';


export const getData = (response,country=null) => {
    let data = {
        country:'',
        date: '',
        time: '',
        total: 0,
        death: 0,
        recover: 0,
        active: 0
    };
    if(!country) data.country = 'World';
    else data.country=country[0].toUpperCase()+country.slice(1) ;
    const $ = cheerio.load(response.data);
    
    
    if(!country){
        let date = $(' body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(5)').text();
        data.date=ParseDateTime(date).date;
        data.time=ParseDateTime(date).time;
    }
    else{
        data.date = Today();
        data.time = UTCTime();
    }

    let i = 1
    $('#maincounter-wrap').each(function(){
        switch(i){
            case 1:
                data.total=parseInt($('#maincounter-wrap > div',this).text().replace(',','').replace(',',''),10);
            break;
            case 2:
                data.death=parseInt($('#maincounter-wrap > div',this).text().replace(',','').replace(',',''),10);
            break;
            case 3:
                data.recover=parseInt($('#maincounter-wrap > div',this).text().replace(',','').replace(',',''),10);
            break;
        }
        i+=1;
    })
    data.active = data.total - data.death - data.recover;
    return data;
}
