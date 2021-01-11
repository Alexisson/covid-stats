const CountriesInColumns = (countries) => {
    let columns = []
    let col1JSON = []
    let col2JSON = []
    let col3JSON = []
    const len = countries.length
    const col1 = len/3
    const col2 = (len/3)*2
    for(let i = 0; i<col1; i++){
        col1JSON.push({
            countryNameRus: countries[i].countryNameRus,
            countryURLName: countries[i].countryURLName
        })
    }
    columns.push(col1JSON)
    for(let i = col1; i<col2; i++){
        col2JSON.push({
            countryNameRus: countries[i].countryNameRus,
            countryURLName: countries[i].countryURLName
        })
    }
    columns.push(col2JSON)
    for(let i = col2; i<len; i++){
        col3JSON.push({
            countryNameRus: countries[i].countryNameRus,
            countryURLName: countries[i].countryURLName
        })
    }
    columns.push(col3JSON)
    return columns
}

module.exports=CountriesInColumns