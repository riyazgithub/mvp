var webtrafficController = require('../webtraffic/webtrafficController.js');
var customerController = require('../customer/customerController.js');
var helpers = require('./helpers.js'); 


module.exports = function (app, express) {

  app.post('/api/webtraffic/info', webtrafficController.addWebtrafficInfo);
  app.post('/api/customer/info', customerController.addCustomerInfo);
  app.get('/api/customer/info', customerController.getCustomerInfo);
  app.get('/api/webtraffic/activeUsers', webtrafficController.getActiveUsers);
  app.get('/api/webtraffic/inactiveUsers', webtrafficController.getInActiveUsers);
  app.get('/api/webtraffic/usersBuying', webtrafficController.getUsersBuying);
  app.get('/api/webtraffic/mvp', webtrafficController.getMostVisitedPageByCustomer);
  app.get('/api/webtraffic/day', webtrafficController.getWebtrafficInTheLastDay);
};
