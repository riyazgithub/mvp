
var serverLocation = 'http://localhost:8000/';
var timeToContact = 5 * 1000;
    // Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
    // Safari <= 9 "[object HTMLElementConstructor]" 
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // Edge 20+
var isEdge = !!window.StyleMedia;
    // Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

var clientInfo = {
  firefox: isFirefox,
  safari: isSafari,
  chrome: isChrome,
  language: window.navigator.language,
  machine: window.navigator.appVersion,
};

var browserInfo = {
  domainName: window.location.hostname,
  currentURL: window.location.pathname,
  timeOpened: new Date(),
  sizeInW: window.innerWidth,
  sizeInH: innerHeight
};

// North Carolina  199.87.34.66
// Kansas 199.87.55.66
//sunnyvale 199.87.78.66

$.get( 'http://ipinfo.io', function (response) {
  clientInfo.ip = response.ip;
  browserInfo.ip = response.ip;
  clientInfo.city = response.city;
  clientInfo.region = response.region;
  clientInfo.location = 'Location: ' + response.city + ', ' + response.region;
  console.log('Recieved Response');
  $.post(serverLocation + 'api/customer/info', clientInfo, function(data) {
    console.log('Server Response clientInfo ', data);
  });

}, 'jsonp');

var displayInfo = function() {
    // console.log('Info ', info);
  browserInfo = {
    domainName: window.location.hostname,
    currentURL: window.location.pathname,
    timeOpened: new Date(),
    sizeInW: window.innerWidth,
    sizeInH: innerHeight,
  };    
  $.post(serverLocation + 'api/webtraffic/info', browserInfo, function(data) {
    console.log('Server Response browserInfo', data);
  });
  console.log('Browser info ', browserInfo);

};
$(window).focus(function() {
  browserInfo.focus = true;
  console.log('Window in focus');
});

$(window).blur(function() {
  browserInfo.focus = false;
  console.log('Window in blur');
});

window.setInterval(displayInfo, timeToContact);