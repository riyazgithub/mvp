var Q = require('q');
var jwt = require('jwt-simple');
var webTraffic = require('./webtrafficModel.js');

module.exports = {
  addWebtrafficInfo: function(req, res, next) { 
    var body = req.body;
    console.log('Yay first request ', req.body);
    res.send('Hard coded response');
  }


};

