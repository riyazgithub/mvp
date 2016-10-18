var Q = require('q');
var jwt = require('jwt-simple');
var Webtraffic = require('./webtrafficModel.js');

var findWebtrafficInfo = Q.nbind(Webtraffic.findOne, Webtraffic);
var createWebtraffic = Q.nbind(Webtraffic.create, Webtraffic);
var findAllWebtrafficInfo = Q.nbind(Webtraffic.find, Webtraffic);

module.exports = {
  addWebtrafficInfo: function(req, res, next) { 
    var webtrafficInfo = req.body;
    findWebtrafficInfo({ ip: webtrafficInfo.ip, 
      domainName: webtrafficInfo.domainName, 
      pathName: webtrafficInfo.pathName, 
      focus: webtrafficInfo.focus, 
      startTime: webtrafficInfo.startTime})
    .then(function(webtrafficInfoResult) {
      if (webtrafficInfoResult) {
        webtrafficInfoResult.timeSpent = webtrafficInfoResult.timeSpent + 5;
        webtrafficInfoResult.save();
      } else {
        createWebtraffic({
          ip: webtrafficInfo.ip,
          domainName: webtrafficInfo.domainName,
          pathName: webtrafficInfo.pathName,
          focus: webtrafficInfo.focus,
          sizeInW: webtrafficInfo.sizeInW,
          sizeInH: webtrafficInfo.sizeInH,
          startTime: webtrafficInfo.startTime,
          timeSpent: 0
        });
        console.log('Webtraffic Created ');
      }
    }).catch(function(err) {
      console.log('Error thrown while adding web traffic', err);
    });
    res.send('Web Traffic information updated !!');
  },
  getActiveUsers: function(req, res, next) {
    Webtraffic.find({ focus: true }, {ip: 1, _id: 0}).sort('-date').exec(function(err, docs) {
      if (err) {
        console.log('Error thrown while getting getInActiveUsers ', err);
      } else {
        res.send(docs);
      }
    });
  },
  getInActiveUsers: function(req, res, next) {
    Webtraffic.find({ focus: false }, {ip: 1, _id: 0}).sort('-date').exec(function(err, docs) {
      if (err) {
        console.log('Error thrown while getting getInActiveUsers ', err);
      } else {
        res.send(docs);
      }
    });
  },
  getUsersBuying: function(req, res, next) {
    Webtraffic.find({ pathName: '/onestepcheckout/index/' }, {ip: 1, _id: 0}).sort('-date').exec(function(err, docs) {
      if (err) {
        console.log('Error thrown while getting getInActiveUsers ', err);
      } else {
        res.send(docs);
      }
    });

  }




};

