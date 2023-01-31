const sql = require('./db'); //DAY 11 B

const insertNewSignIN = (req,res)=>{
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    // insert input data from body into json
    const NewSignUp = {
        "email": req.body.SignUpEmail,
        "name": req.body.SignUpName
    }
    // run qury
    const Q1 = 'INSERT INTO customers SET ?';
    sql.query(Q1, NewSignUp, (err, mysqlres) =>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"couild not sign in"});
            return;
        }
        console.log("created customer: ", {id: mysqlres.insertid});
        res.send({message: "you just signed in successfuly"});
        return;
    })
};

const showAll = (req,res)=>{
    const Q2 = "SELECT * from customers";
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
    const user = req.body.SearchName;

    // run query
    const Q3 = "SELECT * FROM customers where name like ?";
    sql.query(Q3, user + "%", (err, mysqlres)=>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"could not search customer"});
            return;
        }
        console.log("found user: ", mysqlres);
        res.send(mysqlres);
        return;
    })
}

module.exports = {insertNewSignIN, showAll, findUser};

var sql = require('./db');
const path = require('path');
const csv=require('csvtojson');
const cookieParser = require('cookie-parser');


const UserSignUp = (req,res)=>{
    // validate body exists
    if (!req.body) {
        res.status(400).send('error' ,{message: "content cannot be empty"});
        return;
    }
    // create timestamp
    let d = new Date();    
    // insert input data from body into json
    const NewUserSignIn = {
        "UserName": req.body.UserName,
        "UserPassword": req.body.UserPassword,
        "TimeStamp": d
    }
    res.cookie("Signed_user", req.body.UserName);

    // run qury
    const Q1 = 'INSERT INTO TableA SET ?';
    sql.query(Q1, NewUserSignIn, (err, mysqlres) =>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).render('error' , {message:"could not sign up"});
            return;
        }
        res.redirect('/signedUp');
        return;
    })
};

const showAllEntries = (req,res)=>{

  // pull data from body
  const user = req.cookies.Signed_user;
  // run query
  // const Q3 = "SELECT * FROM customers where name like ?";
  const Q3 = 'SELECT * FROM TableA where UserName like ?'
  sql.query(Q3, user + '%',(err, mysqlres)=>{
      if (err) {
          console.log("error: error: ", err);
          res.status(400).send({message:"could not search customer"});
          return;
      }
      console.log("found user: ", mysqlres);
      res.render('page2',{
        v1: 'All entries by '+ user,
        v2:mysqlres
    });
      return;
  })
};


const UserSignIn = (req, res) => {
    // get the data
    const userName = req.cookies.Signed_user;
  
    // fake test data
    let userdetails = {
      username: "Bob",
      password: "123456",
    };
  
    // basic check
    if (
      userName === userdetails["username"] 
    ) {
      // saving the data to the cookies
      res.cookie("username", userName);
      // redirect
      return res.render("welcome", {
        v1: userName
      });
    } else {
      // redirect with a fail msg
      return res.render('error', {message: "some random message"});
    }
  };


module.exports = {UserSignUp, showAllEntries, UserSignIn};