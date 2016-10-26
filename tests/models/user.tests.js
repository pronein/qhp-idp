'use strict';

require('mocha');
const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const user = require('../../models/user').User;

//mongoose.Promise = require('q').Promise;

describe('user', function(){
	describe('schema', function(){
		it('usename is required', function(done){
			var newUser = new user ({
			  username : 'msouza',
			  email: 'marci.souza@deluxe.com',			  
			  phone: '954-573-0146',
			  password: '123456'
			});

			// save user to database
			newUser.save(function(err) {
				console.log(err);
				err.errors.username.should.not.be.undefined;
			    err.errors.username.kind.should.have.string('required');
			}).then(function(){
				done();
			}, function() {
				done();
			});
		})
	});
});
