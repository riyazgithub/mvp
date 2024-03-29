var morgan = require('morgan');
var bodyParser = require('body-parser');
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

// Middleware can be thought of as a pipe that water flows through.
// Water starts at the top opening of the pipe, gets transformed as it falls through,
// and then it is spit out the bottom of the pipe where another pipe could be waiting for it.

// The water in this example is Express's `request` object, and the transformation
// is just a function passed to `app.use`. Any function passed into `app.use`
// will get run on every single request that your server receives

// The order of middleware is defined matters quite a bit! Requests flow through
// middleware functions in the order they are defined. This is useful because
// many times  middleware function is responsible for modifying the `request`
// object in some way so that the next middleware function (or route handler)
// has access to whatever the previous one just did.

// Middleware is useful when you want to do something for every request
// that hits your server. Logging and parsing are two operations
// commonly found in a middleware stack.

module.exports = function (app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.use(allowCrossDomain);
};
