const express = require('express')
const axios = require('axios')

let getDataRus = require('../controller/russia/getData')
let getDateRus = require ('../controller/russia/getDate')


let router = express.Router()
const headersHTML = {'Content-Type':'application/json; charset=utf-8'}

router
    .all('/russia', async r=>{

        r.res.set(headersHTML);
        
        const url = 'https://стопкоронавирус.рф';
        const response = await axios.get(url);
        let data = {
            date: '',
            data: []
        };
        data.date = getDateRus(response);
        data.data = getDataRus(response);
        r.res.send(data)
        
    })


module.exports = router