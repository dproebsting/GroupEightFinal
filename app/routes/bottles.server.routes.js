'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var bottles = require('../../app/controllers/bottles.server.controller');

	// Bottles Routes
	app.route('/bottles')
		.get(bottles.list)
		.post(users.requiresLogin, bottles.create);

	app.route('/bottles/:bottleId')
		.get(bottles.read)
		.put(users.requiresLogin, bottles.hasAuthorization, bottles.update)
		.delete(users.requiresLogin, bottles.hasAuthorization, bottles.delete);

	// Finish by binding the Bottle middleware
	app.param('bottleId', bottles.bottleByID);
};
