const cheerio = require('cheerio');
const is = require('is_js')


const getData = (response,country=null) => {
    let data = {
        country:'',
        // date: '',
        // time: '',
        total:0,
        death:0,
        recover:0,
        active:0

    }
    if(!country) data.country = 'World'
    else data.country=country[0].toUpperCase()+country.slice(1) 
    const $ = cheerio.load(response.data);
    
    
    
    // let date = $(' body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(5)').text()
    
    // date = date
    //     .replace('Last updated:','')
    //     .replace('GMT','')
    //     .replace(',','')
    //     .replace(',','')
    //     .trim()
    // dateArray = date.split(' ')
    // let months = ['January','February','March',
    //             'April','May','June',
    //             'July','August','September',
    //             'October','November','December']
    // for(let i = 0; i < months.length; i++){
    //     if (dateArray[0] === months[i]){
    //         if(i+1<10) dateArray[0]='0'+(i+1).toString() 
    //         else dateArray[0] = (i+1).toString() 
    //     }
    // }
    // date = dateArray[1]+'.'+dateArray[0]+'.'+dateArray[2]
    // let time = dateArray[3]
    // data.date=date
    // data.time=time
    let i = 1
    $('#maincounter-wrap').each(function(){
        switch(i){
            case 1:
                data.total=parseInt($('#maincounter-wrap > div',this).text().replace(',','').replace(',',''),10)
            break;
            case 2:
                data.death=parseInt($('#maincounter-wrap > div',this).text().replace(',','').replace(',',''),10)
            break;
            case 3:
                data.recover=parseInt($('#maincounter-wrap > div',this).text().replace(',','').replace(',',''),10)
            break;

        }
        i+=1

    })
    data.active = data.total - data.death - data.recover
    return data
}


module.exports=getData
