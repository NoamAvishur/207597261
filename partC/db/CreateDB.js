var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');

const CreateTableUsers = (req,res)=> {
    var Q1 = "CREATE TABLE users (firstName VARCHAR(255),lastName VARCHAR(255), email VARCHAR(255),password VARCHAR(255))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created users table table');
        res.send("users table created");
        return;
    })      
}

const InsertDataUsers = (req,res)=>{
    var Q2 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "users.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "firstName": element.firstName,
            "lastName": element.lastName,
            "email": element.email,
            "password": element.password
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    
    res.send("data inserted");

};
const ShowTableUsers = (req,res)=>{
    var Q3 = "SELECT * FROM users";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};

const DropTableUsers = (req, res)=>{
    var Q4 = "DROP TABLE users";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        return;
    })
}

const CreateTableProducts = (req,res)=> {
    var Q5 = "CREATE TABLE products (serial_num SMALLINT, productName VARCHAR(255),productType VARCHAR(255), category VARCHAR(255),description VARCHAR(5000),image VARCHAR(255),price float, email VARCHAR(255), address VARCHAR(255))";
    SQL.query(Q5,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created products table table');
        res.send("products table created");
        return;
    })      
}

const InsertDataProducts = (req,res)=>{
    var Q6 = "INSERT INTO products SET ?";
    const csvFilePath= path.join(__dirname, "products.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "serial_num": element.serial_num,
            "productName": element.productName,
            "productType": element.productType,
            "category": element.category,
            "description": element.description,
            "image": element.image,
            "price": element.price,
            "email": element.email,
            "address":element.address
        }
        SQL.query(Q6, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    res.send("data inserted");
};

const ShowTableProducts = (req,res)=>{
    var Q7 = "SELECT * FROM products";
    SQL.query(Q7, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};

const DropTableProducts = (req, res)=>{
    var Q8 = "DROP TABLE products";
    SQL.query(Q8, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        return;
    })
}
const DropTables= (req, res)=>{
        DropTableUsers(req, res);
        DropTableProducts (req, res);
        console.log("all tables dropped");
        res.send("all tables dropped");
        return;
}
module.exports = {CreateTableUsers, InsertDataUsers, ShowTableUsers, DropTables,CreateTableProducts,InsertDataProducts,ShowTableProducts};