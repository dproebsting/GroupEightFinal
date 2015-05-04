'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var pampers = require('../../app/controllers/pampers.server.controller');

	// Pampers Routes
	app.route('/pampers')
		.get(pampers.list)
		.post(users.requiresLogin, pampers.create);

	app.route('/pampers/:pamperId')
		.get(pampers.read)
		.put(users.requiresLogin, pampers.hasAuthorization, pampers.update)
		.delete(users.requiresLogin, pampers.hasAuthorization, pampers.delete);

	// Finish by binding the Pamper middleware
	app.param('pamperId', pampers.pamperByID);
};
