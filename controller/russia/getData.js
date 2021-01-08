const cheerio = require('cheerio')
const is = require('is_js')


const getDataRus = response => {
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


module.exports = getDataRus;

