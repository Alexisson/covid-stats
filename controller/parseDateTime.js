const ParseDateTime = date => {
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
    let output = {
        date, time
    }
    return output
}

module.exports = ParseDateTime