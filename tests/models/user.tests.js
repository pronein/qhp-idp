'use strict';

//Tests will not run unless an instance of mongod is running on the default port

require('mocha');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const User = require('../../models/user').User;

mongoose.Promise = global.Promise; //This is required to get rid of the Deprecation warning

mongoose.connect('mongodb://localhost/testingdb');

describe('user', function () {
  describe('schema', function () {
    it('username is required', function (done) {
      const target = new User({
        email: 'marci.souza@deluxe.com',
        phone: '954-573-0146',
        password: '123456'
      });

      target.validate(function (err) {
        expect(err.errors.username).to.exist;
        done();
      })
    });

    it('username is unique', function (done) {
      //Save unique username
      //
      const seed = new User({
        username: 'adam',
        email: 'adam.schrader@deluxe.com',
        phone: '123-456-7890',
        password: 'abcd'
      });
      seed.save();

      //Attempt to insert a new user with duplicate username
      //
      const target = new User({
        username: 'adam',
        email: 't444708@deluxe.com',
        phone: '111-111-1112',
        password: 'edcba'
      });

      target.save(function (err) {
        expect(err.code).to.eql(11000);
        done();
      }).then(function () {
        seed.remove();
      });
    });
  });
});
