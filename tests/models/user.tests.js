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
    var seed;
    beforeEach(function(){
      //Save unique username
      seed = new User({
        username: 'adam',
        email: 'adam.schrader@deluxe.com',
        phone: '123-456-7890',
        password: 'abcd'
      });
      seed.save();
    });

    afterEach(function(){
      seed.remove();
    });

    //Check username is required
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
      //Attempt to insert a new user with duplicate username
      const target = new User({
        username: 'adam',
        email: 't444708@deluxe.com',
        phone: '111-111-1112',
        password: 'edcba'
      });      
      target.save(function (err) {
        expect(err.code).to.eql(11000);
        done();
      });
    });

    //Check phone is required
    it('Phone number is required', function (done) {
      const target = new User({
        username: 'xxxx',
        password: '123456',
        email: 'xxxx@deluxe.com'
      });
      target.validate(function (err) {
        expect(err.errors.phone).to.exist;
        done();
      })
    });

    //Check password is required
    it('Password is required', function (done) {
      const target = new User({
        username: 'Myname',
        phone: '777-777-0101',
        email: 'xxxx@deluxe.com'
      });
      target.validate(function (err) {
        expect(err.errors.password).to.exist;
        done();
      })
    });

    //Check email is required
    it('Email is required', function (done) {
      const target = new User({
        username: 'Some name',
        password: '252525',
        phone: '888-573-0101'
      });
      target.validate(function (err) {
        expect(err.errors.email).to.exist;
        done();
      })
    });

  });

  describe('findByUserName', function(){
    var username;
    //Check if username is not an empty string and doesnt exist
    it('Returns null if username is not an empty string and doesnt exist', function(done){
      username = 'usernamedoesntexist';
      User.findByUserName(username, function(err, userWeFoundWithUserNameProvided){  
        expect(userWeFoundWithUserNameProvided).to.not.exist;
        done(); 
      });
    });

    //Check if username is null
    it('Throws an exception if username is an empty string', function(done){      
      username = null;
      User.findByUserName(username, function(err, userWeFoundWithUserNameProvided){
        expect(userWeFoundWithUserNameProvided).to.be.null;
        done(); 
      });
    });

    //Check if username exists
    it('Returns a user when the username exists', function(done){
      username='marci';
      User.findByUserName(username, function(err){        
        expect(username).to.equal('marci'); 
        done(); 
      });     
    });

  });
});
