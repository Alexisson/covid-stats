import express from 'express';
import cheerio from 'cheerio';
import axios from 'axios';
import is from 'is_js'
import {getDate} from './funcs/getDate.js';
import { getData } from './funcs/getData.js';
import e from 'express';


const app = express();
const PORT = 5656;
const headersHTML = {'Content-Type':'application/json; charset=utf-8'}

app
    .all('/', async r=>{
        r.res.send('Home page')
    })
    .all('/russia', async r=>{

        r.res.set(headersHTML);
        
        const url = 'https://стопкоронавирус.рф';
        const response = await axios.get(url);
        
        let data = {
            date: '',
            data: []
        };
        data.date = getDate(response);
        data.data = getData(response);
        console.log(data)
        
        
        r.res.send(data)
        
    })
    .all('/kazakhstan', async r=>{
        r.res.set(headersHTML);
        const url = 'https://www.coronavirus2020.kz/';
        const response = await axios.get(url);
        r.res.send('Kazakhstan')
    })
    .listen(PORT,()=>console.log(`Server is working on port ${PORT}`))