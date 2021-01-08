const cheerio = require('cheerio')

const getDateRus = response => {
    const $ = cheerio.load(response.data);
    let date = $('.cv-banner__description').text();
    date = date
        .replace('По','')
        .replace('состоянию','')
        .replace('на','')
        .trim();
    let months = ['января','февраля','марта',
                    'апреля','мая','июня',
                    'июля','августа','сентября',
                    'октября','ноября','декабря'];
    for(let i = 0; i<months.length; i++){
        if(date.includes(months[i])){
            if(i+1<10) date = date.replace(months[i],'0'+(i+1).toString());
            else date = date.replace(months[i], (i+1).toString());
        }
    }
    
    let dateArray = date.split(' ')
    date = dateArray[0]+'.'+dateArray[1]+'.'+new Date().getFullYear()+' '+dateArray[2];

    return date;
}


module.exports = getDateRus;