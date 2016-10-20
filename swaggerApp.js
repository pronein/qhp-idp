var express = require('express');
var SwaggerExpress = require('swagger-express-mw');

var app = express();
module.exports = app;

var allowCors = function (req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
};

app.use(allowCors);

var swaggerConfig = {
  appRoot: __dirname
};

SwaggerExpress.create(swaggerConfig, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  swaggerExpress.register(app);

  var port = process.env.SWAGGERPORT || 10010;
  app.listen(port);
});
