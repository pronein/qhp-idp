require('mocha');
require('chai').should();

describe("Suite: Class: Module", function(){
  describe("Test: Function", function() {
    it("Feature: Expectation of test", function(){
      var x = 'this is a string';
      x.should.have.lengthOf(16);
    });
  });
});