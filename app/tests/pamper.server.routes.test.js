'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Pamper = mongoose.model('Pamper'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, pamper;

/**
 * Pamper routes tests
 */
describe('Pamper CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Pamper
		user.save(function() {
			pamper = {
				name: 'Pamper Name'
			};

			done();
		});
	});

	it('should be able to save Pamper instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pamper
				agent.post('/pampers')
					.send(pamper)
					.expect(200)
					.end(function(pamperSaveErr, pamperSaveRes) {
						// Handle Pamper save error
						if (pamperSaveErr) done(pamperSaveErr);

						// Get a list of Pampers
						agent.get('/pampers')
							.end(function(pampersGetErr, pampersGetRes) {
								// Handle Pamper save error
								if (pampersGetErr) done(pampersGetErr);

								// Get Pampers list
								var pampers = pampersGetRes.body;

								// Set assertions
								(pampers[0].user._id).should.equal(userId);
								(pampers[0].name).should.match('Pamper Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Pamper instance if not logged in', function(done) {
		agent.post('/pampers')
			.send(pamper)
			.expect(401)
			.end(function(pamperSaveErr, pamperSaveRes) {
				// Call the assertion callback
				done(pamperSaveErr);
			});
	});

	it('should not be able to save Pamper instance if no name is provided', function(done) {
		// Invalidate name field
		pamper.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pamper
				agent.post('/pampers')
					.send(pamper)
					.expect(400)
					.end(function(pamperSaveErr, pamperSaveRes) {
						// Set message assertion
						(pamperSaveRes.body.message).should.match('Please fill Pamper name');
						
						// Handle Pamper save error
						done(pamperSaveErr);
					});
			});
	});

	it('should be able to update Pamper instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pamper
				agent.post('/pampers')
					.send(pamper)
					.expect(200)
					.end(function(pamperSaveErr, pamperSaveRes) {
						// Handle Pamper save error
						if (pamperSaveErr) done(pamperSaveErr);

						// Update Pamper name
						pamper.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Pamper
						agent.put('/pampers/' + pamperSaveRes.body._id)
							.send(pamper)
							.expect(200)
							.end(function(pamperUpdateErr, pamperUpdateRes) {
								// Handle Pamper update error
								if (pamperUpdateErr) done(pamperUpdateErr);

								// Set assertions
								(pamperUpdateRes.body._id).should.equal(pamperSaveRes.body._id);
								(pamperUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Pampers if not signed in', function(done) {
		// Create new Pamper model instance
		var pamperObj = new Pamper(pamper);

		// Save the Pamper
		pamperObj.save(function() {
			// Request Pampers
			request(app).get('/pampers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Pamper if not signed in', function(done) {
		// Create new Pamper model instance
		var pamperObj = new Pamper(pamper);

		// Save the Pamper
		pamperObj.save(function() {
			request(app).get('/pampers/' + pamperObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', pamper.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Pamper instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pamper
				agent.post('/pampers')
					.send(pamper)
					.expect(200)
					.end(function(pamperSaveErr, pamperSaveRes) {
						// Handle Pamper save error
						if (pamperSaveErr) done(pamperSaveErr);

						// Delete existing Pamper
						agent.delete('/pampers/' + pamperSaveRes.body._id)
							.send(pamper)
							.expect(200)
							.end(function(pamperDeleteErr, pamperDeleteRes) {
								// Handle Pamper error error
								if (pamperDeleteErr) done(pamperDeleteErr);

								// Set assertions
								(pamperDeleteRes.body._id).should.equal(pamperSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Pamper instance if not signed in', function(done) {
		// Set Pamper user 
		pamper.user = user;

		// Create new Pamper model instance
		var pamperObj = new Pamper(pamper);

		// Save the Pamper
		pamperObj.save(function() {
			// Try deleting Pamper
			request(app).delete('/pampers/' + pamperObj._id)
			.expect(401)
			.end(function(pamperDeleteErr, pamperDeleteRes) {
				// Set message assertion
				(pamperDeleteRes.body.message).should.match('User is not logged in');

				// Handle Pamper error error
				done(pamperDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Pamper.remove().exec();
		done();
	});
});