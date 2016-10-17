var Q = require('q');
var mongoose = require('mongoose');


/*
currentURL:ents/HackReactor/MVP/2016-09-mvp/downloads/userEvents.html"
domainName:""
ip:""
focus:false
sizeInH:281
sizeInW:1092
timeOpened:Mon Oct 17 2016 15:18:27 GMT-0700 (PDT)
*/

var WebtrafficSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: false
  },
  domainName: {
    type: String,
    required: false
  },
  currentURL: {
    type: String,
    required: false
  },
  focus: {
    type: Boolean,
    required: false
  },
  sizeInW: {
    type: Number,
    required: false
  },
  sizeInH: {
    type: Number,
    required: false
  },
  time: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model('webTraffic', WebtrafficSchema);