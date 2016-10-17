var webtrafficController = require('../webtraffic/webtrafficController.js');
var helpers = require('./helpers.js'); 


module.exports = function (app, express) {

  app.post('/api/webtraffic/info', webtrafficController.addWebtrafficInfo);
};
