const express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const sql = require('./db/db');
const CreateDB = require('./db/CreateDB');
const CRUD = require('./db/CRUD');
const port = 3000;
const fs = require('fs');
const stringify = require('csv-stringify').stringify;
const { parse } = require("csv-parse");
const CSVToJSON = require('csvtojson');// DAY 12 MANAGE CONTENT

const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'static')));
//app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/show_all_customers', CRUD.showAll); // 11 B

app.get('/CreateTable',CreateDB.CreateTable);

app.get("/InsertData", CreateDB.InsertData);

app.get('/ShowTable', CreateDB.ShowTable);

app.get('/DropTable', CreateDB.DropTable);

app.get('/signedUp', (req,res)=>{
    let userNameCookie = req.cookies.Signed_user;
    console.log(userNameCookie);
    res.render('welcome', {v1: userNameCookie});
});

app.get('/', (req, res)=>{
    res.redirect('/landingPage');
});

app.get('/landingPage', (req, res)=>{
    res.render('landingpage');
});

app.get('/home', (req, res)=>{
    res.render('home');
});

app.get('/results', (req, res)=>{// DAY 12 MANAGE CONTENT
    res.render('results');
});

app.get('/product', (req, res)=>{// DAY 12 MANAGE CONTENT
    res.render('product');
});

app.get('/about', (req, res)=>{
    res.render('about',{
        V1:'אודותינו',
        V2:''
    });
});

app.get('/contact', (req, res)=>{
    res.render('contact');
});

app.get('/createaccount', (req, res)=>{
    res.render('createaccount');
});

app.get('/seller', (req, res)=>{// DAY 12 MANAGE CONTENT
    res.render('seller');
});

app.get('/createproduct', (req, res)=>{
    res.render('createproduct');
});

app.get('/editproduct', (req, res)=>{
    res.render('editproduct');
});

app.listen(port, () => {
    console.log("Server is running on port ", port
    );
});