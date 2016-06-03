var request = require('supertest'); 
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Routing', function() {
	var url = 'http://localhost:8080';

	describe('Get api welcome response', function() {
		it('should not return error', function(done){ 
			request(url)
			.get('/api')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res.status).to.be.equal(200);
				
				done();
			});
		});
	});

	describe('Prijave', function() {
		var preTestLen;
		it('GET should not return error', function(done){ 
			request(url)
			.get('/api/prijave')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res.status).to.be.equal(200);
				preTestLen=res.body.length;
				done();
			});
		});
		it('POST should create row', function(done){ 
			request(url)
			.post('/api/prijave?name=testrecord')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res.status).to.be.equal(200);

				done();
			});
			
		});
		it('GET after post should have new row', function(done){ 
			request(url)
			.get('/api/prijave')
			.end(function(err, res) {
				expect(err).to.be.null;
				expect(res.status).to.be.equal(200);
				expect(res.body.length).to.be.equal(preTestLen+1);
				done();
			});
		});


	});
});


