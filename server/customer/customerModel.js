/*
firefor: false, safari: false, chrome: true, language: "en-US", appVersion: "5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKi…L, like Gecko) Chrome/53.0.2785.143 Safari/537.36"…}
appVersion:"5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36"
chrome:true
firefor:false
ip:"199.87.82.66"
language:"en-US"
location: "Location: San Francisco, California"
safari:false
*/

var Q = require('q');
var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: false
  },
  region: {
    type: String,
    required: false
  },
  browser: {
    type: String,
    required: false
  },
  machine: {
    type: String,
    required: false
  },
  language: {
    type: String,
    required: false
  },
  pageVisits: {
    type: Number,
    required: false
  },
  timeOfVisit: {
    type: Date,
    required: false
  }
	}
);

// extracting the machine information

CustomerSchema.pre('save', function(next) {
  var customer = this;
  if (customer.machine.includes('Mac')) {
    customer.machine = 'Macintosh';
  } else {
    customer.machine = 'Windows';
  }
  if (customer.browser.includes('chrome:true')) {
    customer.browser = 'chrome';
  } else if (customer.browser.includes('firefox:true')) {
    customer.browser = 'firefox';
  } else {
    customer.browser = 'safari';
  }
  next();
});

module.exports = mongoose.model('customers', CustomerSchema);