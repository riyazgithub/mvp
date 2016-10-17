var webtrafficController = require('../webtraffic/webtrafficController.js');
var customerController = require('../customer/customerController.js');
var helpers = require('./helpers.js'); 


module.exports = function (app, express) {

  app.post('/api/webtraffic/info', webtrafficController.addWebtrafficInfo);
  app.post('/api/customer/info', customerController.addCustomerInfo);
};
