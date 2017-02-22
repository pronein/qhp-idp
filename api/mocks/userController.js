'use strict';

module.exports = {
  registerUser: registerUser
};

function registerUser(req, res, next) {
  console.log('Request [swagger] Body: ' + JSON.stringify(req.swagger.body));
  res.sendStatus(200);
}