import cheerio from 'cheerio';
import axios from 'axios';
import is from 'is_js'


export const getData = response => {
    const $ = cheerio.load(response.data);
    let data = [];
    $('.cv-countdown').each(function(){
        $('.cv-countdown__item').each(function(){
            if(is.number(parseInt($('.cv-countdown__item-value',this).text().replace(/\s/g, ''),10)))                  
            data.push({
                title : $('.cv-countdown__item-label',this).text().replace(/\t/g, '').replace(/\n/g, ' ').trim(),
                num : parseInt($('.cv-countdown__item-value',this).text().replace(/\s/g, ''),10)
            })
        })
        
    })
    return data
}