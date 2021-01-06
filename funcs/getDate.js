import axios from 'axios'
import cheerio from 'cheerio';

export const getDate = response => {
    const $ = cheerio.load(response.data);
    let date = $('.cv-banner__description').text();
    date = date
        .replace('По','')
        .replace('состоянию','')
        .replace('на','')
        .trim();
    if(date.includes('января')) {date = date.replace('января','01');}
    else if(date.includes('февраля')) {date = date.replace('февраля','02');}
    else if(date.includes('марта')) {date = date.replace('марта','03');}
    else if(date.includes('апреля')) {date = date.replace('апреля','04');}
    else if(date.includes('мая')) {date = date.replace('мая','05');}
    else if(date.includes('июня')) {date = date.replace('июня','06');}
    else if(date.includes('июля')) {date = date.replace('июля','07');}
    else if(date.includes('августа')) {date = date.replace('августа','08');}
    else if(date.includes('сентября')) {date = date.replace('сентября','09');}
    else if(date.includes('октября')) {date = date.replace('октября','10');}
    else if(date.includes('ноября')) {date = date.replace('ноября','11');}
    else {date.replace('декабря','12');}

    let dateArray = date.split(' ')
    date = dateArray[0]+'.'+dateArray[1]+'.'+new Date().getFullYear()+' '+dateArray[2];

    return date;
}