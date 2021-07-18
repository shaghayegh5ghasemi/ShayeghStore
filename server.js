const express = require('express');
const app = express();
const router = require('./Router/router.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const http = require('http');
const fs = require('fs');


app.use(express.static('public'));    // files on the public path are downloadable
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload({useTempFiles : true}))
app.set('views','./htmls');
app.engine('html', require('ejs').renderFile);
app.use('/',router);



var httpServer = http.createServer(app);
httpServer.listen(80);
console.log("http started")