const cheerio = require('cheerio');
const is = require('is_js')


const getData = response => {
    let data = {
        date: '',
        time: '',
        data: []
    }
    const $ = cheerio.load(response.data);
    
    
    
    let date = $(' body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(5)').text()
    
    date = date
        .replace('Last updated:','')
        .replace('GMT','')
        .replace(',','')
        .replace(',','')
        .trim()
    dateArray = date.split(' ')
    let months = ['January','February','March',
                'April','May','June',
                'July','August','September',
                'October','November','December']
    for(let i = 0; i < months.length; i++){
        if (dateArray[0] === months[i]){
            if(i+1<10) dateArray[0]='0'+(i+1).toString() 
            else dateArray[0] = (i+1).toString() 
        }
    }
    date = dateArray[1]+'.'+dateArray[0]+'.'+dateArray[2]
    let time = dateArray[3]
    data.date=date
    data.time=time
    
    $('#maincounter-wrap').each(function(){
        data.data.push(
            {
                title:'',
                num:parseInt($('#maincounter-wrap > div',this).text().replace(',','').replace(',',''),10)
            }
        )
    })
    data.data[0].title = 'Всего случаев:'
    data.data[1].title = 'Смертей:'
    data.data[2].title = 'Выздоровело:'
    data.data.push({
        title:'Активных случаев:',
        num: data.data[0].num-data.data[1].num-data.data[2].num
    })
    return data
}


module.exports=getData
