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





router.post("/test", function(req, res){
  console.log(req.body)
  res.json({'hi':1})
})

router.post("/addbalance",function(req,res){
  if(req.cookies.usertoken == undefined){
    res.redirect('/404')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo= db.db("shayegh")
      dbo.collection("Users").findOne({token:req.cookies.usertoken},function(err,user){
        if(user==undefined){
          res.redirect("/exit")
        }
        else{
          newamount = user.balance + Number(req.body.amount)
          dbo.collection("Users").updateOne({token:req.cookies.usertoken},{$set:{balance:newamount}})
          res.redirect('/profile')
        }
      })
    })
  }
})





router.get("/addbalance",function(req,res){
  if(req.cookies.usertoken == undefined){
    res.redirect('/404')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo= db.db("shayegh")
      dbo.collection("Users").findOne({token:req.cookies.usertoken},function(err,user){
        if(user==undefined){
          res.redirect("/exit")
        }
        else{
          renderdata = {
            main_path:'./login_signup_profile/addbalance.ejs',
            main_data:{user:user},
            user:user
          }
          res.render('index.ejs',renderdata)
        }
      })
    })
  }
})



router.post("/editinfo",function(req,res){
  if(req.cookies.usertoken == undefined && req.cookies.admintoken == undefined){
    res.redirect('/404')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo = db.db("shayegh")
      dbo.collection("Users").findOne({token:req.cookies.usertoken},async function(err,user){
        if(user==undefined){
          res.redirect('/404')
        }
        else{
          //TODO
          //change user info
        }
      })
    })
  }
})


router.get("/profile",function(req,res){
  if(req.cookies.usertoken == undefined && req.cookies.admintoken == undefined){
    res.redirect('/404')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo = db.db("shayegh")
      dbo.collection("Users").findOne({token:req.cookies.usertoken},async function(err,user){
        if(user==undefined){

        }
        else{
          orders =await dbo.collection("Orders").find({customer_id:user._id.toString()}).toArray()
          renderdata = {
            main_path:'./login_signup_profile/profile.ejs',
            main_data:{user:user,orders:orders},
            user:user
          }
          res.render('index.ejs',renderdata)
        }
      })
    })
  }
})



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
  MongoClient.connect(dburl,async function(err,db){
    var dbo = db.db("shayegh")
    categories = await dbo.collection("Categories").find({}).toArray()
    if(req.cookies.usertoken == undefined && req.cookies.admintoken == undefined){
      renderdata = {
        main_path:'./homepage.ejs',
        main_data:{categories:categories},
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
                main_data:{categories:categories},
                user:{firstname:"admin",lastname:""},
              }
              res.render('index.ejs',renderdata)
            }
          })
        }
        else{
          renderdata = {
            main_path:'./homepage.ejs',
            main_data:{categories:categories},
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

router.get("/404",function(req,res){
  if(req.cookies.usertoken == undefined && req.cookies.admintoken == undefined){
    renderdata = {
      main_path:'./404.ejs',
      main_data:{},
      user:""
    }
    res.render('index.ejs',renderdata)
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo = db.db("shayegh")
      dbo.collection("Users").findOne({token:req.cookies.usertoken}, function(err,user){
        if(user==undefined){
          dbo.collection("Admins").findOne({token:req.cookies.admintoken},function(err,admin){
            renderdata = {
              main_path:'./404.ejs',
              main_data:{firstname:"admin",lastname:""},
              user:user
            }
            res.render('index.ejs',renderdata)
          })
        }
        else{
          renderdata = {
            main_path:'./404.ejs',
            main_data:{},
            user:user
          }
          res.render('index.ejs',renderdata)
        }
      })
    })
  }
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