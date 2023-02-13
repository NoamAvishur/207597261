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
                sellerEmail=req.cookies.sellerEmail;
                const Q7="SELECT * FROM products WHERE email=?"
                sql.query(Q7, sellerEmail, (err, results) =>{
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
const findProductBySerial = (req,res)=>{
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "please fill the search"});
        return;    }
    // pull data from body
    const serial_num = req.params.serial;
    // run query
    const Q9 = "SELECT * FROM products where serial_num=?";
    sql.query(Q9, [serial_num], (err, mysqlres)=>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"could not search product"});
            return;
        }
        res.cookie("serial_num", serial_num);
        res.cookie("productName", mysqlres[0].productName);
        res.cookie("productType", mysqlres[0].productType);
        res.cookie("category", mysqlres[0].category);
        res.cookie("description", mysqlres[0].description);
        res.cookie("image", mysqlres[0].image);
        res.cookie("price", mysqlres[0].price);
        res.cookie("sellerEmail", mysqlres[0].email);
        res.cookie("address", mysqlres[0].address);
        res.redirect("/editproduct");
        return;
    })
}
const removeProduct=(req,res)=>{
    const serial_num = JSON.parse(req.cookies.choosenProduct);
    const Q10="DELETE FROM products WHERE  serial_num=?";
    sql.query(Q10, [serial_num], (err) => {
        if (err) {
            console.log("can't delete item", err);
            return;
        }
        const sellerEmail=req.cookies.sellerEmail;
        const Q11="SELECT * FROM products WHERE email=?"
        sql.query(Q11, [sellerEmail], (err, results) =>{
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

    })})
}
const editProduct = (req, res) => {
    // Validate body exists
    if (!req.body) {
      res.status(400).send({ message: "Content cannot be empty" });
      return;
    }
    const serial_num = req.cookies.serial_num;
    // Validate serial number exists in the cookie
    if (!serial_num) {
      res.status(400).send({ message: "Serial number not found in the cookie" });
      return;
    }
    const editProduct = {
      productName: req.body.productName,
      productType: req.body.productType,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      address: req.body.address
    };
  
    const Q12 = "UPDATE products SET ? WHERE serial_num = ?";
    sql.query(Q12, [editProduct, serial_num], (err, mysqlRes) => {
      if (err) {
        console.log("Error: ", err);
        res.status(400).send({ message: "Could not update product" });
        return;
      }
      // Get updated products list for the seller
      const sellerEmail = req.cookies.sellerEmail;
      const query = "SELECT * FROM products WHERE email = ?";
      sql.query(query, [sellerEmail], (err, results) => {
        if (err) {
          console.log("Error: ", err);
          res.status(400).send({ message: "Could not search products" });
          return;
        }
  
        if (results.length === 0) {
          console.log("Error: ", err);
          res.cookie("results", "");
          res.redirect("/seller");
          return;
        }
        res.cookie("results", results);
        res.redirect("/seller");
        return;
    })
})};
const findProductBySerialUser = (req,res)=>{
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "please fill the search"});
        return;    }
    // pull data from body
    const serial_num = req.params.serial;
    // run query
    const Q13 = "SELECT * FROM products where serial_num=?";
    sql.query(Q13, [serial_num], (err, mysqlres)=>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"could not search product"});
            return;
        }
        res.cookie("serial_num", serial_num);
        res.cookie("productName", mysqlres[0].productName);
        res.cookie("productType", mysqlres[0].productType);
        res.cookie("category", mysqlres[0].category);
        res.cookie("description", mysqlres[0].description);
        res.cookie("image", mysqlres[0].image);
        res.cookie("price", mysqlres[0].price);
        res.cookie("sellerEmail", mysqlres[0].email);
        res.cookie("address", mysqlres[0].address);
        res.redirect("/product");
        return;
    })
}
const findProductByFilter = (req,res)=>{
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "please fill the search"});
        return;    }
    // pull data from body
    const userSearch = req.cookie.search;
    // run query
    const Q14 = "SELECT * FROM products where productName like ?";
    sql.query(Q14, ['%' + userSearch + '%'], (err, mysqlres)=>{
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
module.exports = {insertNewSignIN, showAllUsers, findUser,insertNewProduct,editProduct,showAllProducts,findProduct, removeProduct,findProductBySerialUser, findProductBySerial,findProductByFilter};