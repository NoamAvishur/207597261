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
app.post('/insertNewProduct', CRUD.insertNewProduct);
app.post('/editProduct',CRUD.editProduct);
app.get('/showAllProducts', CRUD.showAllProducts);
app.post('/findProduct', CRUD.findProduct);
app.get('/removeProduct', CRUD.removeProduct);
app.get('/findProductBySerial/:serial', CRUD.findProductBySerial);


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
    let userSearch = req.cookies.search;
    let userResults = req.cookies.results;
    res.render('results', {v6:userResults, v7:userSearch});
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
    let userNameCookie = req.cookies.sellerName;
    res.render('createaccount',{v9:userNameCookie});
});

app.get('/seller', (req, res)=>{
    let userEmailCookie = req.cookies.sellerEmail;
    let userNameCookie = req.cookies.sellerName;
    let userResults = req.cookies.results;
    res.render('seller', {v4:userNameCookie, v5:userResults});
});

app.get('/createproduct', (req, res)=>{
    let userEmailCookie = req.cookies.sellerEmail;
    res.render('createproduct', {v8:userEmailCookie});
});

app.get('/editproduct', (req, res)=>{
    let serial_num = req.cookies.serial_num;
    let productName = req.cookies.productName;
    let productType = req.cookies.productType;
    let category = req.cookies.category;
    let description = req.cookies.description;
    let image = req.cookies.image;
    let address = req.cookies.address;
    let price = req.cookies.price;
    let userEmailCookie = req.cookies.sellerEmail;
    res.render('editproduct', {v11:image,v12:price,v13:address, v14:productName, v15:productType, v16:category, v17:description, v18:userEmailCookie});
});

app.listen(port, () => {
    console.log("Server is running on port ", port
    );
});