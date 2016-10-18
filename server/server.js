var express = require('express');
var mongoose = require('mongoose');
var https = require('https');
var httpsPort = 8001;
var fs = require("fs");
// Setup HTTPS
var options = {
  key: fs.readFileSync('/Users/riyazahmed/Documents/HackReactor/MVP/2016-09-mvp/private.key'),
  cert: fs.readFileSync('/Users/riyazahmed/Documents/HackReactor/MVP/2016-09-mvp/certificate.pem')
};

var app = express();
var secureServer = https.createServer(options, app).listen(httpsPort);

// connect to mongo database named "mvp"
mongoose.connect('mongodb://localhost/mvp');

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

// start listening to requests on port 8000
app.listen(8000);
console.log('Server is up at 8000 and 8001');
// export our app for testing and flexibility, required by index.js
module.exports = app;
