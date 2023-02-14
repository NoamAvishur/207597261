const sql = require('./db'); 

const insertNewSignIN = (req,res)=>{// in order to sign up as seller
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
        sql.query(Q1, req.body.email, (err, mysqlres) =>{// checking if this email doesnt exist in thr DB yet (this is our key)
            if (err) {
                console.log("error: error: ", err);
                res.status(400).send({message:"could not sign in"});
                return;
            }if (mysqlres.length != 0){//there is already user with this email!
                console.log("error: error: ", err);
                res.render('createaccount',{v2: "קיים משתמש עם מייל זהה"});
                return;
            }
            const Q2 = 'INSERT INTO users SET ?';// after validation we'll insert the new user
            sql.query(Q2, NewSignUp, (err, mysqlres) =>{
                if (err) {
                    console.log("error: error: ", err);
                    res.status(400).send({message:"could not sign in"});
                    return;
                }
                res.cookie("sellerName", req.body.firstName);//saving the user name cookie
                res.cookie("sellerEmail", req.body.email);//saving the user email cookie
                res.cookie("results", "");// this is a new user so he doesnt have products yet
                res.redirect('/seller');
                return;
            })
        })
};

const findUser = (req,res)=>{//in order to log in from the landing page
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "please fill in the email and password"});
        return;    
    }
    // pull data from body
    const email = req.body.email;
    const password = req.body.password;
    // run query
    const Q4 = "SELECT * FROM users WHERE email=? AND password=?"//in oder to chack that the email and password are correct
    sql.query(Q4, [email,password], (err, mysqlres)=>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"could not search user"});
            return;
        }
        if (mysqlres.length == 0){//if we didnt find them in the DB
            console.log("error: error: ", err);
            res.render('landingpage',{v3: "אימייל או סיסמה לא נכונים"});
            return;
        }
        res.cookie("sellerName", mysqlres[0].firstName);//saving the user name cookie
        res.cookie("sellerEmail", email);//saving the user email cookie
        const Q5="SELECT * FROM products WHERE email=?"// we want to show the seller his products in the seller page
        sql.query(Q5, email, (err, results) =>{
            if (err) {
                console.log("error: error: ", err);
                res.status(400).send({message:"could not search products"});
                return;
            }
            if (results.length == 0){//the user doesnt have products
                console.log("error: error: ", err);
                res.cookie("results", "");
                res.redirect('/seller');
                return;
            }
            res.cookie("results", results);//saving the user results cookie
            res.redirect("/seller");
            return;

        });
    });
};

const insertNewProduct = (req,res)=>{//creating a new product in the "createproduct" page
    var max_index=-1; // we want to create a serial number
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const Q3 = "SELECT MAX(serial_num) as max_num FROM products";
    sql.query(Q3, (err, results) =>{
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
            const Q6 = 'INSERT INTO products SET ?';//insert the new product to the DB
            sql.query(Q6, NewProduct, (err, mysqlres) =>{
                if (err) {
                    console.log("error: error: ", err);
                    res.status(400).send({message:"couild create product"});
                    return;
                }
                const sellerEmail=req.cookies.sellerEmail;
                const Q7="SELECT * FROM products WHERE email=?"
                sql.query(Q7, sellerEmail, (err, results) =>{ // refreshing the seller page to show all of his products
                    if (err) {
                        console.log("error: error: ", err);
                        res.status(400).send({message:"could not search products"});
                        return;
                    }
                    if (results.length == 0){//the user doesnt have products
                        console.log("error: error: ", err);
                        res.cookie("results", "");
                        res.redirect('/seller');
                        return;
                    }
                    res.cookie("results", results);//saving the user results cookie
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

const findProduct = (req,res)=>{// in order to search product by name from home or results
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "please fill the search"});
        return;    }
    // pull data from body
    const userSearch = req.body.search;
    // run query
    const Q8 = "SELECT * FROM products where productName like ?";// the name wont be accurate so we use 'like'
    sql.query(Q8, ['%' + userSearch + '%'], (err, mysqlres)=>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"could not search product"});
            return;
        }
        res.cookie("results", mysqlres);//saving the user results cookie
        res.cookie("search", userSearch);//saving the user search cookie - in order to show it in the search line
        res.redirect("/results");
        return;
    })
}
const findProductBySerial = (req,res)=>{// search product by serial number in order to edit it
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "please fill the search"});
        return;    }
    // pull data from url
    const serial_num = req.params.serial;
    // run query
    const Q9 = "SELECT * FROM products where serial_num=?";
    sql.query(Q9, [serial_num], (err, mysqlres)=>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"could not search product"});
            return;
        }
        //saving all the cookies in order to show them in the form - then the user will be able to change only the fieldes that he want
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
const removeProduct=(req,res)=>{// delete product from the DB - from the seller page
    const serial_num = JSON.parse(req.cookies.choosenProduct);// we get the serial number from the client JS as string 
    const Q10="DELETE FROM products WHERE  serial_num=?";
    sql.query(Q10, [serial_num], (err) => {
        if (err) {
            console.log("can't delete item", err);
            return;
        }
        const sellerEmail=req.cookies.sellerEmail;
        const Q11="SELECT * FROM products WHERE email=?";// refreshing the seller page to show all of his products
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
};

const editProduct = (req, res) => {// edit product in the DB - from the seller page
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
      image: req.cookies.image,
      price: req.body.price,
      address: req.body.address
    };
    const Q12 = "UPDATE products SET ? WHERE serial_num = ?";// update the product according to what the user filled
    sql.query(Q12, [editProduct, serial_num], (err, mysqlRes) => {
      if (err) {
        console.log("Error: ", err);
        res.status(400).send({ message: "Could not update product" });
        return;
      }
      // Get updated products list for the seller
      const sellerEmail = req.cookies.sellerEmail;
      const query = "SELECT * FROM products WHERE email = ?";// refreshing the seller page to show all of his products
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
const findProductBySerialUser = (req,res)=>{// in oder to open a product from the results page
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "please fill the search"});
        return;    }
    // pull data from body
    const serial_num = req.params.serial;// getting the serial number from the url
    // run query
    const Q13 = "SELECT * FROM products where serial_num=?";
    sql.query(Q13, [serial_num], (err, mysqlres)=>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"could not search product"});
            return;
        }
        //saving all the cookies in order to fill the page with the product data
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
const findProductByFilter = (req,res)=>{// in order to use filters on the search
    // run query
    const filters ={//the filters are a form
        productType: req.body.productType,
        category: req.body.category,
        price: req.body.price,
    }
    const userSearch = req.cookies.search;
    let Q14 = "SELECT * FROM products where productName like ? AND 1=1";
    let params = [];// the parametres of the query
    if (filters.productType) {//if the user filled a productType filter we'll add this to the query
        Q14 += " AND productType=?";
        params.push(filters.productType);
    }
    if (filters.category) {//if the user filled a category filter we'll add this to the query
        Q14 += " AND category=?";
        params.push(filters.category);
    }
    if (filters.price) {//if the user filled a max price filter we'll add this to the query
        Q14 += " AND price<=?";
        params.push(filters.price);
    }
    sql.query(Q14, [['%' + userSearch + '%'],params], (err, mysqlres)=>{
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
module.exports = {insertNewSignIN, findUser,insertNewProduct,editProduct, findProduct, removeProduct,findProductBySerialUser, findProductBySerial,findProductByFilter};