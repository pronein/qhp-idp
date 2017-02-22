'use strict';

module.exports = {
  getAllUsers: getAllUsers_mock
};

function getAllUsers_mock(req, res, next) {
  var authorization = req.header('authorization');
  var authToken = authorization.split(' ')[1];

  if (authToken === '01234') {
    console.log('User has no access to get all users.');
    res.sendStatus(204);
  } else if (authToken === '500') {
    console.log('Internal server error');
    res.status(500).send({message: 'An internal server error has been detected.'});
  } else if (authToken !== '1234') {
    console.log('User has access, but there are no users.');
    res.status(200).send({users: []});
  } else {
    console.log('User has access to view all users.');
    res.status(200).send({users: [
      {
        username: 't444708',
        email: 'adam@deluxe.com'
      },
      {
        username: 't123456',
        email: 'her@deluxe.com'
      },
      {
        username: 'k789234',
        email: 'contractor@deluxe.com'
      }
    ]});
  }
}