
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

var browserInfo = {
  firefor: isFirefox,
  safari: isSafari,
  chrome: isChrome,
  domainName: window.location.hostname,
  currentURL: window.location.pathname,
  timeOpened: new Date(),
  timezone: ( new Date()).getTimezoneOffset() / 60,
  appVersion: window.navigator.appVersion,
  language: window.navigator.language,
  sizeDocW: document.width,
  sizeDocH: document.height,
  sizeInW: window.innerWidth,
  sizeInH: innerHeight
};

$.get( 'http://ipinfo.io', function (response) {
  browserInfo.ip = response.ip;
  browserInfo.location = 'Location: ' + response.city + ', ' + response.region;
  console.log('Recieved Response');
}, 'jsonp');

var displayInfo = function() {
    // console.log('Info ', info);
  $.post(serverLocation + 'api/webtraffic/info', browserInfo, function(data) {
    console.log('Server Response ', data);
  });
  console.log('Browser info ', browserInfo);

};
$(window).focus(function() {
  browserInfo.focus = true;
  browserInfo.blur = false;
  console.log('Window in focus');
});

$(window).blur(function() {
  browserInfo.focus = false;
  browserInfo.blur = true;
  console.log('Window in blur');
});

window.setInterval(displayInfo, timeToContact);