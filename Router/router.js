const express = require('express');
const router = express.Router();
const fs = require('fs');
const url = require('url');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const cookieParser = require('cookie-parser');
const mv = require('mv');
const dburl = "mongodb://localhost:27017/";

const Category = require('../Objects/Category.js');
const Order = require('../Objects/Order.js');
const Product = require('../Objects/Product.js');
const User = require('../Objects/User.js');
const Admin = require('../Objects/Admin.js');


router.get('/test',function(req,res){
    res.render('index.ejs')
    res.end()
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