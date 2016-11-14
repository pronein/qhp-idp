'use strict';

//Tests will not run unless an instance of mongod is running on the default port

require('mocha');
const bcrypt = require('bcrypt-nodejs');
const expect = require('chai').expect;
const should = require('chai').should();
const mongoose = require('mongoose');
const User = require('../../models/user').User;
const EmailErrorMessage = require('../../models/user').EMAIL_ERROR_MESSAGE;
const PhoneErrorMessage = require('../../models/user').PHONE_ERROR_MESSAGE;

mongoose.Promise = global.Promise; //This is required to get rid of the Deprecation warning

mongoose.connect('mongodb://localhost/testingdb');

describe('user', function () {

    var seed;
    var seedUserName = 'adam';
    var seedEmail = 'adam@deluxe.com';
    var seedPassword = 'abcdefg';

    beforeEach(function(){
      //Save unique username
      seed = new User({
        username: seedUserName,
        email: seedEmail,
        phone: '123-456-7890',
        password: seedPassword
      });
      seed.save();
    });

    afterEach(function(){
      seed.remove();
    });

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
      //Attempt to insert a new user with duplicate username
      const target = new User({
        username: seedUserName,
        email: seedEmail + 's',
        phone: '111-111-1112',
        password: 'edcba'
      });      
      target.save(function (err) {
        expect(err.code).to.eql(11000);
        done();
      });
    });   

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

    it('Phone number is not valid', function(done){
     const target = new User({
         username: 'Marci',
         phone: '9999999',
         email: 'email@test.com',
         password: 'dddyyyy'
       });
       target.validate(function(err){
           expect(err.errors.phone.message).to.equal(PhoneErrorMessage);
           done();
       });
    });

    it('Phone number is valid', function(done){
     const target = new User({
         username: 'Marci',
         phone: '999-999-9999',
         email: 'email@test.com',
         password: 'dddyyyy'
       });
       target.validate(function(err){
           expect(err).to.equal(null);
           done();
       });
    });

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

    it('email is unique', function (done) {
      const target = new User({
        username: seedUserName + 'm',
        email: seedEmail,
        phone: '888-888-8888',
        password: 'edcba'
      });      
      target.save(function (err) {
        expect(err.code).to.eql(11000);
        done();
      });
    }); 

    it('email is not valid', function(done){
     const target = new User({
         username: 'Myname',
         phone: '777-777-0101',
         email: 'notvalid@test',
         password: 'dddyyyy'
       });
       target.validate(function(err){
           expect(err.errors.email.message).to.equal(EmailErrorMessage);
           done();
       });
    });

    it('email is valid', function(done){
     const target = new User({
         username: 'Myname',
         phone: '777-777-0101',
         email: 'validemail@test.com',
         password: 'dddyyyy'
       });
       target.validate(function(err){
           expect(err).to.equal(null);
           done();
       });
    });
  });

  describe('pre-save', function() {

    var password;
    it('hash the password if password is new',function(done){
     const beforeSave = new User({
        username: seedUserName + 'hh',
        email: 'errr@test.com',
        phone: '123-456-7890',
        password: seedPassword
      });
      beforeSave.save(function(){
        expect(seedPassword).to.not.equal(beforeSave.password);
        done();
      });
    });

    it('hash the password if password is modified', function(done){
        var password = seedPassword + 'g';
        seed.password = password;
        seed.save(function(){
           expect(password).to.not.equal(seed.password);
           done();
       });
    });

    it('does not hash the password when password not modified', function(done){
        User.findByUserName(seed.username, function(err, target){
            target.username = seedUserName + 'ss';
            var beforeSavePassword = target.password;
            target.save(function(){
                expect(beforeSavePassword).to.be.equal(target.password);
                done();
            });
        });
    });
  });

  describe('comparePassword', function() {

    it('is true if attempted password matches the users password', function(done) {
        seed.comparePassword(seedPassword, function(isMatch){
            expect(isMatch).to.be.equal(true);
            done();
        });
    });

    it('is false if attempted password does not match the users password', function(done) {
        var password = seedPassword + 'a';
        seed.comparePassword(password, function(isMatch){
            expect(isMatch).to.be.equal(false);
            done();
        });
    });
  });

  describe('findByUserName', function(){
    var username;
    it('sets user to null in callback if username is not found', function(done){
      username = 'usernamedoesntexist';
      User.findByUserName(username, function(err, userWeFoundWithUserNameProvided){
        expect(userWeFoundWithUserNameProvided).to.be.null;
        done();
      });
    });

    it('sets user in callback if username is found', function(done){
      username = seedUserName;
      User.findByUserName(username, function(err, userWeFoundWithUserNameProvided){
        expect(userWeFoundWithUserNameProvided.username).to.equal(username);
        done();
      });
    });

  });
});
