var request = require('supertest'); 
//var assert = require('chai').assert;
var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect;

var app = require('../app');

describe('API Routing', function() {
	describe('Get api welcome response', function() {
		it('should not return error', function(done){ 
			request(app).get('/api')
			.expect(200,done);
		});
	});

	describe('Prijave API', function() {
		var preTestLen;
		var createdId;
		it('GET doesn`t return error nor too old data', function(done){ 
			request(app).get('/api/prijave')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				preTestLen=res.body.length;
				res.body.forEach(function (item){
					var itemDaysOld = (new Date()-new Date(item.date))/(1000*60*60*24);
					expect(itemDaysOld).to.be.below(7);
				});
				done();
			});
		});

		it('POST doesn`t return error', function(done){ 
			request(app).post('/api/prijave?name=testrecord')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				createdId = res.body.message;
				done();
			});
		});

		it('GET after POST has new row', function(done){ 
			request(app).get('/api/prijave')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.length).to.be.equal(preTestLen+1);
				expect(res.body).to.containSubset([{_id:createdId,name:'testrecord'}]);
				done();
			});
		});

		it('DELETE doesn`t return error', function(done){ 
			request(app).delete('/api/prijave?id='+createdId)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.message).to.be.equal('Successfully deleted');
				done();
			});
		});

		it('GET after DELETE doesn`t have deleted row', function(done){ 
			request(app).get('/api/prijave')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.length).to.be.equal(preTestLen);
				expect(res.body).not.to.containSubset([{_id:createdId,name:'testrecord'}]);
				done();
			});
		});

	});

	describe('Ne mogu API', function() {
		var preTestLen;
		var createdId;
		it('GET doesn`t return error nor too old data', function(done){ 
			request(app).get('/api/nemogu')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				preTestLen=res.body.length;
				res.body.forEach(function (item){
					var itemDaysOld = (new Date()-new Date(item.date))/(1000*60*60*24);
					expect(itemDaysOld).to.be.below(7);
				});
				done();
			});
		});

		it('POST doesn`t return error', function(done){ 
			request(app).post('/api/nemogu?name=testrecord')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				createdId = res.body.message;
				done();
			});
		});

		it('GET after POST has new row', function(done){ 
			request(app).get('/api/nemogu')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.length).to.be.equal(preTestLen+1);
				expect(res.body).to.containSubset([{_id:createdId,name:'testrecord'}]);
				done();
			});
		});

		it('DELETE doesn`t return error', function(done){ 
			request(app).delete('/api/nemogu?id='+createdId)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.message).to.be.equal('Successfully deleted');
				done();
			});
		});

		it('GET after DELETE doesn`t have deleted row', function(done){ 
			request(app).get('/api/nemogu')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.length).to.be.equal(preTestLen);
				expect(res.body).not.to.containSubset([{_id:createdId,name:'testrecord'}]);
				done();
			});
		});

	});

	describe('Stalni API', function() {
		var preTestLen;
		var createdId;
		it('GET doesn`t return error', function(done){ 
			request(app).get('/api/nemogu')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				preTestLen=res.body.length;
				done();
			});
		});

		it('POST doesn`t return error', function(done){ 
			request(app).post('/api/nemogu?name=testrecord')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				createdId = res.body.message;
				done();
			});
		});

		it('GET after POST has new row', function(done){ 
			request(app).get('/api/nemogu')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.length).to.be.equal(preTestLen+1);
				expect(res.body).to.containSubset([{_id:createdId,name:'testrecord'}]);
				done();
			});
		});

		it('DELETE doesn`t return error', function(done){ 
			request(app).delete('/api/nemogu?id='+createdId)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.message).to.be.equal('Successfully deleted');
				done();
			});
		});

		it('GET after DELETE doesn`t have deleted row', function(done){ 
			request(app).get('/api/nemogu')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.length).to.be.equal(preTestLen);
				expect(res.body).not.to.containSubset([{_id:createdId,name:'testrecord'}]);
				done();
			});
		});

	});

	describe('Notifikacije API', function() {
		it('DELETE doesn`t return error', function(done){ 
			request(app).delete('/api/notifikacija')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.message).to.be.equal('Successfully deleted');
				done();
			});
		});

		it('GET after delete is empty', function(done){ 
			request(app).get('/api/nemogu')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.text).to.be.equal(undefined);
				done();
			});
		});
		
		it('POST doesn`t return error', function(done){ 
			request(app).post('/api/notifikacija?text=Ovo%20je%20test')
			.expect(200,done);
		});

		it('GET after post has added notifikacija', function(done){ 
			request(app).get('/api/notifikacija')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.text).to.be.equal('Ovo je test');
			
				done();
			});
		});

		it('Another POST doesn`t return error', function(done){ 
			request(app).post('/api/notifikacija?text=Ovo%20je%20novo')
			.expect(200,done);
		});

		it('GET after post reads new notifikacija', function(done){ 
			request(app).get('/api/notifikacija')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.text).to.be.equal('Ovo je novo');
			
				done();
			});
		});

		it('DELETE to clear all doesn`t return error', function(done){ 
			request(app).delete('/api/notifikacija')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.message).to.be.equal('Successfully deleted');
				done();
			});
		});

		it('GET after delete all is empty', function(done){ 
			request(app).get('/api/nemogu')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.text).to.be.equal(undefined);
				done();
			});
		});



	});
});


