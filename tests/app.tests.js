'use strict';

require('mocha');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const app = require('../app');

describe('app', () => {
  describe('router', () => {
    it('should respond with 404 when route not found', done => {
      chai.request(app)
        .get('/invalidpath')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        })
    });

    it('should serve public content', done => {
      chai.request(app)
        .get('/stylesheets/style.css')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
    });
  })
});