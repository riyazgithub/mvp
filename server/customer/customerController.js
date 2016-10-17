var Q = require('q');
var jwt = require('jwt-simple');
var Customer = require('./customerModel.js');

var findCustomer = Q.nbind(Customer.findOne, Customer);
var createCustomer = Q.nbind(Customer.create, Customer);

module.exports = {
  addCustomerInfo: function(req, res, next) { 
    var customerInfo = req.body;
    findCustomer({ ip: customerInfo.ip })
    .then(function(customer) {
      if (customer) {
        console.log('Update Customer Page Visit here ', customerInfo);
      } else {
        createCustomer({
          ip: customerInfo.ip,
          city: customerInfo.city,
          region: customerInfo.region,
          browser: 'firefox:' + customerInfo.firefox + 'chrome:' + customerInfo.chrome + 'safari' + customerInfo.safari,
          machine: customerInfo.machine,
          language: customerInfo.language,
          pageVisits: 0

        });
      }

    });
    res.send('Customer info stored in DB');
  }


};

