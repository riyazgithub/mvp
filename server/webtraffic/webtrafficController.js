var Q = require('q');
var jwt = require('jwt-simple');
var Webtraffic = require('./webtrafficModel.js');

var findWebtrafficInfo = Q.nbind(Webtraffic.findOne, Webtraffic);
var createWebtraffic = Q.nbind(Webtraffic.create, Webtraffic);


module.exports = {
  addWebtrafficInfo: function(req, res, next) { 
    var webtrafficInfo = req.body;
    console.log('Web Traffic ', webtrafficInfo);
    findWebtrafficInfo({ ip: webtrafficInfo.ip, 
      domainName: webtrafficInfo.domainName, 
      pathName: webtrafficInfo.pathName, 
      focus: webtrafficInfo.focus, 
      startTime: webtrafficInfo.startTime})
    .then(function(webtrafficInfoResult) {
      if (webtrafficInfoResult) {
        webtrafficInfoResult.timeSpent = webtrafficInfoResult.timeSpent + 5;
        webtrafficInfoResult.save();
        console.log('Webtraffic Updated ');
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
      console.log('Error thrown ', err);
    });
    res.send('Web Traffic information updated !!');
  }


};

