const express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sql = require('./db/db');
const CreateDB = require('./db/CreateDB');
const CRUD = require('./db/CRUD');
const port = 3000;
const fs = require('fs');
const stringify = require('csv-stringify').stringify;
const { parse } = require('csv-parse');
const csv = require('csvtojson');

const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'static')));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//createDB
//users
app.get('/CreateTableUsers',CreateDB.CreateTableUsers);
app.get('/InsertDataUsers', CreateDB.InsertDataUsers);
app.get('/ShowTableUsers', CreateDB.ShowTableUsers);
//app.get('/DropTableUsers', CreateDB.DropTableUsers);
//products
app.get('/CreateTableProducts',CreateDB.CreateTableProducts);
app.get('/InsertDataProducts', CreateDB.InsertDataProducts);
app.get('/ShowTableProducts', CreateDB.ShowTableProducts);
app.get('/DropTables', CreateDB.DropTables);

//users
app.post('/insertNewSignIN', CRUD.insertNewSignIN);
app.get('/showAllUsers', CRUD.showAllUsers);
app.post('/findUser', CRUD.findUser);
//products
app.get('/insertNewProduct', CRUD.insertNewProduct);
app.get('/showAllProducts', CRUD.showAllProducts);
app.get('/findProduct', CRUD.findProduct);

//routes
app.get('/', (req, res)=>{
    res.redirect('/landingPage');
});

app.get('/landingPage', (req, res)=>{
    res.render('landingpage');
});

app.get('/home', (req, res)=>{
    res.render('home');
});

app.get('/results', (req, res)=>{
    res.render('results');
});

app.get('/product', (req, res)=>{
    res.render('product');
});

app.get('/about', (req, res)=>{
    const csvPath = path.join(__dirname,"./content/about.csv");
    csv().fromFile(csvPath).then((jsonObj)=>{
        console.log(jsonObj);
        //res.send("jason object created");
        res.render('about', {
            var1: jsonObj
        })
    })
});
 
app.get('/contact', (req, res)=>{
    res.render('contact');
});

app.get('/createaccount', (req, res)=>{
    res.render('createaccount');
});

app.get('/seller', (req, res)=>{
    let userNameCookie = req.cookies.sellerName;
    //let userEmailCookie = req.cookies.sellerEmail;
    res.render('seller', {v4:userNameCookie});
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