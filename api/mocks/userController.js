'use strict';

module.exports = {
  registerUser: registerUser_mock
};

function registerUser_mock(req, res, next) {
  console.log('Request [swagger] Body (req.swagger.params.user.value): ' + JSON.stringify(req.swagger.params.user.value));

  var user = req.swagger.params.user.value;
  if(user.username[0] === 't') {
    //[201] success
    res.status(201).send({
      username: user.username,
      message: 'User successfully registered.'
    });
  } else if(user.username[0] === 'k') {
    //[422] username not unique
    console.warn('Username is not unique.');
    res.status(422).send({
      username: user.username,
      message: 'There was a problem processing your request.'
    })
  } else if(!user.email.contains('@deluxe.com')){
    //[422] email not unique
  } else if(user.password.replace(/\s/g, '').length === 0) {
    //[422] password is empty string
  } else {
    //[500] default server error
  }
}