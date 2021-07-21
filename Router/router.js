const express = require('express');
const router = express.Router();
const fs = require('fs');
const url = require('url');
const MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb')
var ObjectId = require('mongodb').ObjectId
const mv = require('mv');
const md5 = require('md5')
const dburl = "mongodb://localhost:27017/";
const Category = require('../Objects/Category.js');
const Order = require('../Objects/Order.js');
const Product = require('../Objects/Product.js');
const User = require('../Objects/User.js');
const Admin = require('../Objects/Admin.js');








router.get("/removecategory",function(req,res){
  if(req.cookies.admintoken == undefined){
    res.redirect('/404')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo= db.db("shayegh")
      dbo.collection("Admins").findOne({token:req.cookies.admintoken},function(err,admin){
        if(admin==undefined){
          res.redirect("/404")
        }
        else{
          var query = url.parse(req.url,true).query
          c_id = mongo.ObjectId(query.id)
          dbo.collection("Categories").findOne({_id:c_id},function(err,category){
            dbo.collection("Products").updateMany({category:category.name},{$set:{category:"دسته بندی نشده"}})
            dbo.collection("Categories").deleteOne({_id:c_id})
            res.redirect("/profile")
          })
        }
      })
    })
  }
})




router.post("/editcategory",function(req,res){
  if(req.cookies.admintoken == undefined){
    res.redirect('/404')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo= db.db("shayegh")
      dbo.collection("Admins").findOne({token:req.cookies.admintoken},function(err,admin){
        if(admin==undefined){
          res.redirect("/404")
        }
        else{
          var query = url.parse(req.url,true).query
          c_id = mongo.ObjectId(query.id)
          dbo.collection("Categories").findOne({_id:c_id},function(err,category){
            dbo.collection("Products").updateMany({category:category.name},{$set:{category:req.body.name}})
            dbo.collection("Categories").updateOne({_id:c_id},{$set:{name:req.body.name}})
            res.redirect("/profile")
          })
        }
      })
    })
  }
})


router.get("/editcategory",function(req,res){
  if(req.cookies.admintoken == undefined){
    res.redirect('/404')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo= db.db("shayegh")
      dbo.collection("Admins").findOne({token:req.cookies.admintoken},function(err,admin){
        if(admin==undefined){
          res.redirect("/404")
        }
        else{
          var query = url.parse(req.url,true).query
          renderdata = {
            main_path:'./login_signup_profile/edit_category.ejs',
            main_data:{id:query.id},
            user:{firstname:"admin",lastname:""}
          }
          res.render('index.ejs',renderdata)
          res.end()
        }
      })
    })
  }
})



router.post("/addcategory",function(req,res){
  if(req.cookies.admintoken == undefined){
    res.redirect('/404')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo= db.db("shayegh")
      dbo.collection("Admins").findOne({token:req.cookies.admintoken},function(err,admin){
        if(admin==undefined){
          res.redirect("/404")
        }
        else{
          ncat = new Category(req.body.name,true)
          dbo.collection("Categories").insertOne(ncat,function(err,dbasf){
            res.redirect("/profile")
          })
        }
      })
    })
  }
})


router.get("/addcategory",function(req,res){
  if(req.cookies.admintoken == undefined){
    res.redirect('/404')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo= db.db("shayegh")
      dbo.collection("Admins").findOne({token:req.cookies.admintoken},function(err,admin){
        if(admin==undefined){
          res.redirect("/404")
        }
        else{
          renderdata = {
            main_path:'./login_signup_profile/add_category.ejs',
            main_data:{},
            user:{firstname:"admin",lastname:""}
          }
          res.render('index.ejs',renderdata)
          res.end()
        }
      })
    })
  }
})




router.post("/editproduct",function(req,res){
  if(req.cookies.admintoken == undefined){
    res.redirect('/404')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo= db.db("shayegh")
      dbo.collection("Admins").findOne({token:req.cookies.admintoken},function(err,admin){
        if(admin==undefined){
          res.redirect("/404")
        }
        else{
          var query = url.parse(req.url,true).query
          p_id = mongo.ObjectId(query.id)
          dbo.collection("Products").updateOne({_id:p_id},{$set:{category:req.body.category,name:req.body.name,price:Number(req.body.price),count:Number(req.body.count)}})
          res.redirect("/profile")
        }
      })
    })
  }
})



router.get("/editproduct",function(req,res){
  if(req.cookies.admintoken == undefined){
    res.redirect('/404')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo= db.db("shayegh")
      dbo.collection("Admins").findOne({token:req.cookies.admintoken},function(err,admin){
        if(admin==undefined){
          res.redirect("/404")
        }
        else{
          var query = url.parse(req.url,true).query
          renderdata = {
            main_path:'./login_signup_profile/edit_product.ejs',
            main_data:{id:query.id},
            user:{firstname:"admin",lastname:""}
          }
          res.render('index.ejs',renderdata)
          res.end()
        }
      })
    })
  }
})


router.post("/addproduct",function(req,res){
  if(req.cookies.admintoken == undefined){
    res.redirect('/404')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo= db.db("shayegh")
      dbo.collection("Admins").findOne({token:req.cookies.admintoken},function(err,admin){
        if(admin==undefined){
          res.redirect("/404")
        }
        else{
          newp = new Product(req.body.name,Number(req.body.price),Number(req.body.count),"img/sample_product.jpg")
          dbo.collection("Products").insertOne(newp,function(err,asd){
            res.redirect('/profile')
          })
        }
      })
    })
  }
})


router.get("/addproduct",function(req,res){
  if(req.cookies.admintoken == undefined){
    res.redirect('/404')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo= db.db("shayegh")
      dbo.collection("Admins").findOne({token:req.cookies.admintoken},function(err,admin){
        if(admin==undefined){
          res.redirect("/404")
        }
        else{
          renderdata = {
            main_path:'./login_signup_profile/add_product.ejs',
            main_data:{},
            user:{firstname:"admin",lastname:""}
          }
          res.render('index.ejs',renderdata)
          res.end()
        }
      })
    })
  }
})


router.post("/buy",function(req,res){
  if(req.cookies.usertoken == undefined){
    res.redirect('/login')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo = db.db("shayegh")
      dbo.collection("Users").findOne({token:req.cookies.usertoken},function(err,user){
        if(user == undefined){
          res.redirect('/login')
        }
        else{
          var query = url.parse(req.url,true).query
          p_id = mongo.ObjectId(query.id)
          dbo.collection("Products").findOne({_id:p_id},function(err,product){
            if(product.count<Number(req.body.count)){
              renderdata = {
                main_path:'./buyresult.ejs',
                main_data:{flag:0},
                user:user
              }
              res.render('index.ejs',renderdata)
              res.end()
            }
            else if(product.price*Number(req.body.count)>user.balance){
              renderdata = {
                main_path:'./buyresult.ejs',
                main_data:{flag:1},
                user:user
              }
              res.render('index.ejs',renderdata)
              res.end()
            }
            else{
              order = new Order(product.name,Number(req.body.count),user.firstname+" "+user.lastname,user._id,user.address,"shop"+new Date().getTime(),product.price*Number(req.body.count))
              dbo.collection("Orders").insertOne(order);
              dbo.collection("Products").updateOne({_id:p_id},{$set:{count:product.count-Number(req.body.count),sold:product.sold + Number(req.body.count)}})
              dbo.collection("Users").updateOne({token:req.cookies.usertoken},{$set:{balance:user.balance - product.price*Number(req.body.count)}})
              renderdata = {
                main_path:'./buyresult.ejs',
                main_data:{flag:2},
                user:user
              }
              res.render('index.ejs',renderdata)
              res.end()
            }
          })
        }
      })
    })
  }
})



router.get("/buy",function(req,res){
  if(req.cookies.usertoken == undefined){
    res.redirect('/login')
  }
  else{
    MongoClient.connect(dburl,function(err,db){
      var dbo = db.db("shayegh")
      dbo.collection("Users").findOne({token:req.cookies.usertoken},function(err,user){
        if(user == undefined){
          res.redirect('/login')
        }
        else{
          var query = url.parse(req.url,true).query
          renderdata = {
            main_path:'./buycount.ejs',
            main_data:{id:query.id},
            user:user
          }
          res.render('index.ejs',renderdata)
          res.end()
        }
      })
    })
  }
})

router.post("/getproducts",function(req,res){
  console.log(req.body)
  MongoClient.connect(dburl,async function(err,db){
    var dbo = db.db("shayegh")
    products =[]
    listminmax = req.body.price_range.split('-')
    min = Number(listminmax[0])
    max = Number(listminmax[1])
    final_res = []
    tproducts = await dbo.collection("Products").find({}).toArray()
    if(req.body.categories.length >0){
      for(let i =0;i<tproducts.length;i++){
        if(req.body.categories.indexOf(tproducts[i].category) != -1){
          products.push(tproducts[i])
        }
      }
    }
    else{
      products = tproducts
    }
    for(let i =0;i<products.length;i++){
      if(products[i].price<=max && products[i].price >= min){
        final_res.push(products[i])
      }
    }
    if(req.body.sorting == "best_seller"){
      final_res.sort((a,b) => b.sold- a.sold);
    }
    if(req.body.sorting == "highest_price"){
      final_res.sort((a,b) => b.price- a.price);
    }
    pagenumber = Number(req.body.page)
    
    res.json({products:final_res.slice((pagenumber-1)*15,(pagenumber)*15)})
    res.end()
  })
})

router.post("/search", function(req, res){
  MongoClient.connect(dburl,async function(err,db){
    var dbo = db.db("shayegh")
    var search_str = req.body.query
    final_res = []
    tproducts = await dbo.collection("Products").find({}).toArray()
    for(let i = 0; i<tproducts.length;i++){
      if(tproducts[i].name.includes(search_str)){
        final_res.push(tproducts[i])
      }
    }
    res.json({products:final_res})
    res.end()
  })
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
          res.end()
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
          dbo.collection("Admins").findOne({token:req.cookies.admintoken},async function(err,admin){
            if(admin==undefined){
              res.redirect('/404')
            }
            else{
              products = await dbo.collection("Products").find({}).toArray()
              orders = await dbo.collection("Orders").find({}).toArray()
              categories = await dbo.collection("Categories").find({}).toArray()
              renderdata = {
                main_path:'./login_signup_profile/adminpanel.ejs',
                main_data:{products:products,orders:orders,categories:categories},
                user:{firstname:"admin",lastname:""}
              }
              res.render('index.ejs',renderdata)
              res.end()
            }
          })
        }
        else{
          orders =await dbo.collection("Orders").find({customer_id:user._id}).toArray()
          renderdata = {
            main_path:'./login_signup_profile/profile.ejs',
            main_data:{user:user,orders:orders},
            user:user
          }
          res.render('index.ejs',renderdata)
          res.end()
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
  res.end()
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
  res.end()
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
            res.end()
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
              res.end()
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
          res.end()
        }
      }
    })
  })
})





router.get("/",function(req,res){
  MongoClient.connect(dburl,async function(err,db){
    var dbo = db.db("shayegh")
    categories = await dbo.collection("Categories").find({}).toArray()
    final_res = await dbo.collection("Products").find({}).toArray()
    pagenumbers = Math.ceil(final_res.length/15)
    if(req.cookies.usertoken == undefined && req.cookies.admintoken == undefined){
      renderdata = {
        main_path:'./homepage.ejs',
        main_data:{categories:categories,pagenumbers:pagenumbers},
        user:""
      }
      res.render('index.ejs',renderdata)
      res.end()
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
                main_data:{categories:categories,pagenumbers:pagenumbers},
                user:{firstname:"admin",lastname:""},
              }
              res.render('index.ejs',renderdata)
              res.end()
            }
          })
        }
        else{
          renderdata = {
            main_path:'./homepage.ejs',
            main_data:{categories:categories,pagenumbers:pagenumbers},
            user:user
          }
          res.render('index.ejs',renderdata)
          res.end()
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
    res.end()
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
            res.end()
          })
        }
        else{
          renderdata = {
            main_path:'./404.ejs',
            main_data:{},
            user:user
          }
          res.render('index.ejs',renderdata)
          res.end()
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