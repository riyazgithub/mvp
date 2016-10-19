var Q = require('q');
var jwt = require('jwt-simple');
var Webtraffic = require('./webtrafficModel.js');
var Customer = require('./../customer/customerModel.js');
var findAllCustomers = Q.nbind(Customer.find, Customer);

var _ = require('underscore');

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
    var queryDate = new Date();
    queryDate.setHours(queryDate.getHours() - 2);
    Webtraffic.find({}, {ip: 1, pathName: 1, startTime: 1, _id: 0})
    .sort('-startTime').exec(function(err, docs) {
      if (err) {
        console.log('Error thrown while getting getInActiveUsers ', err);
      } else {
        // we gotto parse the result before sending them out
        docs = _.uniq(docs, function(item, key, ip) { 
          return item.ip;
        });
        findAllCustomers({})
        .then(function(customers) {
          if (customers) {
            var responseString = [];
            _.each(docs, function(doc) {
              var findCustomer = _.find(customers, function(customer) {
                return doc.ip === customer.ip;
              });
              var pageName = doc.pathName.slice('1');
              pageName = pageName || 'Home';
              responseString.push({displayString: 'A customer from ' + findCustomer.city + ', ' + findCustomer.region + ' is viewing your ' + pageName + ' page', ip: findCustomer.ip});
            });
            res.send(responseString);
          } else {
            res.send([]);
          }
        })
        .catch(function(err) {
          console.log('Error thrown ', err);
        });
      }
    });
  },
  getInActiveUsers: function(req, res, next) {
    var queryDate = new Date();
    queryDate.setHours(queryDate.getHours() - 2);
    Webtraffic.find({ focus: false }, {ip: 1, _id: 0})
    .where('startTime').gt(queryDate)
    .sort('-date').exec(function(err, docs) {
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

  },
  getMostVisitedPageByCustomer: function(req, res, next) {
    Webtraffic.find({}, {ip: 1, pathName: 1, timeSpent: 1, _id: 0})
    .sort('timeSpent').exec(function(err, docs) {
      if (err) {
        console.log('Error thrown while getting getMostVisitedPageByCustomer ', err);
      } else {
        docs = _.uniq(docs, function(item, key, ip) { 
          return item.ip;
        });
        res.send(docs);
      }

    });

  },
  getWebtrafficInTheLastDay: function(req, res, next) {
    Webtraffic.find({focus: true})
    .exec(function(err, docs) {
      if (err) {
        console.log('Error thrown while getting getMostVisitedPageByCustomer ', err);
      } else {
        console.log('Before ', docs.length);
        res.send(docs);
      }

    });
  }





};

