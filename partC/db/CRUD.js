const sql = require('./db'); //DAY 11 B

const insertNewSignIN = (req,res)=>{
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    // insert input data from body into json
    const NewSignUp = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": req.body.password
    }
    // run qury
    const Q1 = 'INSERT INTO users SET ?';
    sql.query(Q1, NewSignUp, (err, mysqlres) =>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"could not sign in"});
            return;
        }
        console.log("created customer: ", {id: mysqlres.insertid});
        res.send({message: "you just signed in successfuly"});
        return;
    })
};

const showAllUsers = (req,res)=>{
    const Q2 = "SELECT * from users";
    sql.query(Q2, (err, mysqlres)=>{
        if (err) {
            res.status(400).send("error");
            return;
        };
        //res.send(mysqlres);
        const t = new Date();
        res.render('results', {
            v1:'Customers',
            v2:t,
            mysqlresArray:mysqlres
        })
        return;
    });
};

const findUser = (req,res)=>{
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "please fill user name to search"});
        return;    }
    // pull data from body
    const user = [req.body.email, req.body.password];
    // run query
    const Q3 = "SELECT * FROM Students WHERE email=? and password=?";
    sql.query(Q3, user + "%", (err, mysqlres)=>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"could not search customer"});
            return;
        }
        if (results.length == 0){
            console.log("error: error: ", err);
            res.render('landingpage',{v3: "אימייל או סיסמה לא תקינים"});
            return;
        }
        res.cookie("sellerName", results[0].firstName);
        res.cookie("sellerEmail", results[0].email);
        res.redirect('/seller');
        console.log("found user: ", mysqlres);
        res.send(mysqlres);
        return;
    })
}
const insertNewProduct = (req,res)=>{
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    // insert input data from body into json
    const NewProduct = {
            "productName": req.body.productName,
            "productType": req.body.productType,
            "category": req.body.category,
            "description": req.body.description,
            "image": req.body.image,
            "price": req.body.price,
            "email": req.body.email,
            "address":req.body.address
    }
    // run qury
    const Q4 = 'INSERT INTO products SET ?';
    sql.query(Q4, NewProduct, (err, mysqlres) =>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"couild create product"});
            return;
        }
        console.log("created Product: ", {id: mysqlres.insertid});
        res.send({message: "the Product created successfuly"});
        return;
    })
};

const showAllProducts = (req,res)=>{
    const Q5 = "SELECT * from products";
    sql.query(Q5, (err, mysqlres)=>{
        if (err) {
            res.status(400).send("error");
            return;
        };
        //res.send(mysqlres);
        const t = new Date();
        res.render('results', {
            v1:'Products',
            v2:t,
            mysqlresArray:mysqlres
        })
        return;
    });
};

const findProduct = (req,res)=>{
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "please fill the search"});
        return;    }
    // pull data from body
    const user = req.body.SearchName;

    // run query
    const Q6 = "SELECT * FROM products where name like ?";
    sql.query(Q6, user + "%", (err, mysqlres)=>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"could not search product"});
            return;
        }
        console.log("found products: ", mysqlres);
        res.send(mysqlres);
        return;
    })
}
module.exports = {insertNewSignIN, showAllUsers, findUser,insertNewProduct,showAllProducts,findProduct};