var Q = require('q');
var jwt = require('jwt-simple');
var Customer = require('./customerModel.js');

var findCustomer = Q.nbind(Customer.findOne, Customer);
var createCustomer = Q.nbind(Customer.create, Customer);
var findAllCustomers = Q.nbind(Customer.find, Customer);

module.exports = {
  addCustomerInfo: function(req, res, next) { 
    var customerInfo = req.body;
    findCustomer({ ip: customerInfo.ip })
    .then(function(customer) {
      if (customer) {
        customer.pageVisits = customer.pageVisits + 1;
        customer.timeOfVisit = new Date();
        customer.save();
      } else {
        createCustomer({
          ip: customerInfo.ip,
          city: customerInfo.city,
          region: customerInfo.region,
          browser: 'firefox:' + customerInfo.firefox + 'chrome:' + customerInfo.chrome + 'safari' + customerInfo.safari,
          machine: customerInfo.machine,
          language: customerInfo.language,
          pageVisits: 1,
          timeOfVisit: customerInfo.timeOfVisit
        });
      }

    }).catch(function(err) {
      console.log('Error thrown ', err);
    });
    res.send('Customer info stored in DB');
  },
  getCustomerInfo: function(req, res, next) {
    findAllCustomers({})
    .then(function(customers) {
      if (customers) {
        res.send(customers);
      } else {
        res.send([]);
      }
    })
    .catch(function(err) {
      console.log('Error thrown ', err);
    });


  }


};

