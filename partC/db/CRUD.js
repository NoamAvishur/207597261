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
    console.log(NewSignUp);
    const Q1 = "SELECT * FROM users WHERE email =?"
        sql.query(Q1, req.body.email, (err, mysqlres) =>{
            if (err) {
                console.log("error: error: ", err);
                res.status(400).send({message:"could not sign in"});
                return;
            }if (mysqlres.length != 0){
                console.log("error: error: ", err);
                res.render('createaccount',{v2: "קיים משתמש עם מייל זהה"});
                return;
            }
            const Q2 = 'INSERT INTO users SET ?';
            sql.query(Q2, NewSignUp, (err, mysqlres) =>{
                if (err) {
                    console.log("error: error: ", err);
                    res.status(400).send({message:"could not sign in"});
                    return;
                }
                res.cookie("sellerName", req.body.firstName);
                res.cookie("sellerEmail", req.body.email);
                res.cookie("results", "");
                res.redirect('/seller');
                return;
            })
        })
};
    

const showAllUsers = (req,res)=>{
    const Q3 = "SELECT * from users";
    sql.query(Q3, (err, mysqlres)=>{
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
        res.status(400).send({message: "please fill in the email and password"});
        return;    
    }
    // pull data from body
    const email = req.body.email;
    const password = req.body.password;
    // run query
    const Q4 = "SELECT * FROM users WHERE email=? AND password=?"
    sql.query(Q4, [email,password], (err, mysqlres)=>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"could not search user"});
            return;
        }
        if (mysqlres.length == 0){
            console.log("error: error: ", err);
            res.render('landingpage',{v3: "email or password not valid"});
            return;
        }
        res.cookie("sellerName", mysqlres[0].firstName);
        res.cookie("sellerEmail", email);
        const Q5="SELECT * FROM products WHERE email=?"
        sql.query(Q5, email, (err, results) =>{
            if (err) {
                console.log("error: error: ", err);
                res.status(400).send({message:"could not search products"});
                return;
            }
            if (results.length == 0){
                console.log("error: error: ", err);
                res.cookie("results", "");
                res.redirect('/seller');
                return;
            }
            res.cookie("results", results);
            res.redirect("/seller");
            return;

        });
    });
};

const insertNewProduct = (req,res)=>{
    var max_index=-1;
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const Q_get_max_serial = "SELECT MAX(serial_num) as max_num FROM products";
    sql.query(Q_get_max_serial, (err, results) =>{
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message:"Couldn't get max serial number"});
            return;
        }
        if(Number.isInteger(results[0].max_num)){
            max_index=results[0].max_num+1;
               // insert input data from body into json
               const NewProduct = {
                "serial_num": max_index,
                "productName": req.body.productName,
                "productType": req.body.productType,
                "category": req.body.category,
                "description": req.body.description,
                "image": req.body.image,
                "price": req.body.price,
                "email": req.cookies.sellerEmail,
                "address":req.body.address
            }
            const Q6 = 'INSERT INTO products SET ?';
            sql.query(Q6, NewProduct, (err, mysqlres) =>{
                if (err) {
                    console.log("error: error: ", err);
                    res.status(400).send({message:"couild create product"});
                    return;
                }
                userEmail=req.body.email;
                const Q7="SELECT * FROM products WHERE email=?"
                sql.query(Q7, userEmail, (err, results) =>{
                    if (err) {
                        console.log("error: error: ", err);
                        res.status(400).send({message:"could not search products"});
                        return;
                    }
                    if (results.length == 0){
                        console.log("error: error: ", err);
                        res.cookie("results", "");
                        res.redirect('/seller');
                        return;
                    }
                    res.cookie("results", results);
                    res.redirect("/seller");
                    return;

                });
            })
        }
        else{ 
            res.status(400).send({message:"Invalid max serial number"});
            return;
        }
    })
};

const showAllProducts = (req,res)=>{
    const Q7 = "SELECT * from products";
    sql.query(Q7, (err, mysqlres)=>{
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
    const userSearch = req.body.search;

    // run query
    const Q8 = "SELECT * FROM products where productName like ?";
    sql.query(Q8, ['%' + userSearch + '%'], (err, mysqlres)=>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"could not search product"});
            return;
        }
        res.cookie("results", mysqlres);
        res.cookie("search", userSearch);
        res.redirect("/results");
        return;
    })
}
module.exports = {insertNewSignIN, showAllUsers, findUser,insertNewProduct,showAllProducts,findProduct};