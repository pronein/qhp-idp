'use strict';

module.exports = {
  updateUser: updateUser_mock
};

function updateUser_mock(req, res, next) {
  res.status(304).send({});
}