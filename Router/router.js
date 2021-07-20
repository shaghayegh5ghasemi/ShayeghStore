const express = require('express');
const router = express.Router();
const fs = require('fs');
const url = require('url');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mv = require('mv');
const md5 = require('md5')
const dburl = "mongodb://localhost:27017/";
const Category = require('../Objects/Category.js');
const Order = require('../Objects/Order.js');
const Product = require('../Objects/Product.js');
const User = require('../Objects/User.js');
const Admin = require('../Objects/Admin.js');


router.get("/databaseprob",function(req,res){
  var query = url.parse(req.url,true).query;
  if(md5(query.key) == "59554ce884a8552efd296eb2d8f30c53"){
    MongoClient.connect(dburl,function(err,db){
      var dbo = db.db("shayegh");
      dbo.createCollection("Users", function(err, res1) {
        if (err) throw err;
        console.log("Collection Users created!");
        dbo.createCollection("Admins", function(err, res1) {
          if (err) throw err;
          console.log("Collection Admins created!");
          dbo.createCollection("Categories", function(err, res1) {
            if (err) throw err;
            console.log("Collection Categories created!");
            dbo.createCollection("Orders", function(err, res1) {
              if (err) throw err;
              console.log("Collection Orders created!");
              dbo.createCollection("Products", function(err, res1) {
                if (err) throw err;
                console.log("Collection Products created!");
                admin = new Admin('admin@shayegh.com','59554ce884a8552efd296eb2d8f30c53')
                dbo.collection("Admins").insertOne(admin,function(err,res1){
                  default_cat = new Category('دسته بندی نشده',false)
                  dbo.collection("Categories").insertOne(default_cat,function(err,res1){
                    db.close();
                    res.redirect("/")
                  })
                })
              });
            });
          });
        });
      });
    })
  }
})

router.get('/test',function(req,res){
    res.render('index.ejs')
    res.end()
})




router.get("/signup",function(req,res){
  renderdata = {
    main_path:'./login_signup_profile/signup.ejs',
    main_data:{flag:0},
    user:""
  }
  res.render('index.ejs',renderdata)
})

router.post("/signup",function(req,res){
  MongoClient.connect(dburl,function(err,db){
    var dbo = db.db("shayegh")
    newuser = new User(req.body.email,md5(req.body.password),req.body.first_name,req.body.last_name,req.body.address)
    res.cookie('usertoken',newuser.token)
    dbo.collection("Users").insertOne(newuser,function(err,qwe){
      db.close()
      res.redirect('/')
    })
  })
})


router.get("/login",function(req,res){
  renderdata = {
    main_path:'./login_signup_profile/login.ejs',
    main_data:{flag:0},
    user:""
  }
  res.render('index.ejs',renderdata)
})

router.post("/login",function(req,res){
  MongoClient.connect(dburl,function(err,db){
    var dbo = db.db("shayegh")
    dbo.collection("Users").findOne({username:req.body.email},function(err,user){
      if(user == undefined){
        dbo.collection("Admins").findOne({username:req.body.email},function(err,admin){
          if(admin == undefined){
            renderdata = {
              main_path:'./login_signup_profile/login.ejs',
              main_data:{flag:1},
              user:""
            }
            res.render('index.ejs',renderdata)
          }
          else{
            if(md5(req.body.password) == admin.pass){
              res.cookie('admintoken', admin.token);
              res.redirect('/profile')
            }
            else{
              renderdata = {
                main_path:'./login_signup_profile/login.ejs',
                main_data:{flag:1},
                user:""
              }
              res.render('index.ejs',renderdata)
            }
          }
        })
      }
      else{
        if(md5(req.body.password) == user.pass){
          res.cookie('usertoken', user.token);
          res.redirect('/')
        }
        else{
          renderdata = {
            main_path:'./login_signup_profile/login.ejs',
            main_data:{flag:1},
            user:""
          }
          res.render('index.ejs',renderdata)
        }
      }
    })
  })
})





router.get("/",function(req,res){
  MongoClient.connect(dburl,function(err,db){
    var dbo = db.db("shayegh")
    if(req.cookies.usertoken == undefined && req.cookies.admintoken == undefined){
      renderdata = {
        main_path:'./homepage.ejs',
        main_data:{},
        user:""
      }
      res.render('index.ejs',renderdata)
    }
    else{
      dbo.collection("Users").findOne({token:req.cookies.usertoken},function(err,user){
        if(user==undefined){
          res.clearCookie('usertoken');
          dbo.collection("Admins").findOne({token:req.cookies.admintoken},function(err,admin){
            if(admin == undefined){
              res.clearCookie("admintoken")
              res.redirect('/')
            }
            else{
              renderdata = {
                main_path:'./homepage.ejs',
                main_data:{},
                user:{firstname:"admin",lastname:""},
              }
              res.render('index.ejs',renderdata)
            }
          })
        }
        else{
          renderdata = {
            main_path:'./homepage.ejs',
            main_data:{},
            user:user
          }
          res.render('index.ejs',renderdata)
        }
      })
    }
  })
})

router.get("/exit",function(req,res){
  res.clearCookie('usertoken')
  res.clearCookie('admintoken')
  res.redirect('/')
})


router.get('*', function (req, res) {
  res.redirect("/404");
  res.statusCode = 404;
  res.end();
});


router.post('*', function (req, res) {
  res.redirect("/404");
  res.statusCode = 404;
  res.end();
});



module.exports = router;