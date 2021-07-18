const express = require('express');
const router = express.Router();
const fs = require('fs');
const url = require('url');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var cookieParser = require('cookie-parser');
var mv = require('mv');
var dburl = "mongodb://localhost:27017/";



router.get('/',function(req,res){
})


router.get('/exit', function (req, res) {
  req.session.prevurl = req.session.currurl;
  req.session.currurl = req.url;
  MongoClient.connect(dburl, function (err, db) {
    var dbo = db.db("mydb");
    res.clearCookie('usertoken');
    res.clearCookie('doctortoken');
    res.clearCookie('admintoken');
    res.clearCookie('HCtoken');
    db.close();
    res.redirect("/adminlogin");
    res.end();
  })
})



router.get('*', function (req, res) {
  req.session.prevurl = req.session.currurl;
  req.session.currurl = req.url;
  res.redirect("/adminlogin");
  res.statusCode = 404;
  res.end();
});


router.post('*', function (req, res) {
  req.session.prevurl = req.session.currurl;
  req.session.currurl = req.url;
  res.redirect("/adminlogin");
  res.statusCode = 404;
  res.end();
});



module.exports = router;