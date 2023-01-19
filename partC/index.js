const express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sql = require('./db/db');
//const CreateDB = require('./db/CreateDB');
const CRUD = require('./db/CRUD');
const port = 8080;

const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'static')));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res)=>{
    res.redirect('/landingPage');
});
app.get('/landingPage', (req, res)=>{
    res.render('landingpage');
});

app.listen(8080, () => {
    console.log("Server is running on port ", port
    );
    });