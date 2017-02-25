'use strict';

module.exports = {
  updateUser: updateUser_mock
};

function updateUser_mock(req, res, next) {
  var username = req.swagger.params.username.value;
  var user = req.swagger.params.user.value;

  if (username !== 'bad_username') {
    res.sendStatus(204);
  } else {
    res.status(422).send({message: 'Invalid username.'});
  }
}