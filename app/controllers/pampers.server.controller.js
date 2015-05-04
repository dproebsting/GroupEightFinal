'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Pamper = mongoose.model('Pamper'),
	_ = require('lodash');

/**
 * Create a Pamper
 */
exports.create = function(req, res) {
	var pamper = new Pamper(req.body);
	pamper.user = req.user;

	pamper.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pamper);
		}
	});
};

/**
 * Show the current Pamper
 */
exports.read = function(req, res) {
	res.jsonp(req.pamper);
};

/**
 * Update a Pamper
 */
exports.update = function(req, res) {
	var pamper = req.pamper ;

	pamper = _.extend(pamper , req.body);

	pamper.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pamper);
		}
	});
};

/**
 * Delete an Pamper
 */
exports.delete = function(req, res) {
	var pamper = req.pamper ;

	pamper.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pamper);
		}
	});
};

/**
 * List of Pampers
 */
exports.list = function(req, res) { 
	Pamper.find().sort('-created').populate('user', 'displayName').exec(function(err, pampers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pampers);
		}
	});
};

/**
 * Pamper middleware
 */
exports.pamperByID = function(req, res, next, id) { 
	Pamper.findById(id).populate('user', 'displayName').exec(function(err, pamper) {
		if (err) return next(err);
		if (! pamper) return next(new Error('Failed to load Pamper ' + id));
		req.pamper = pamper ;
		next();
	});
};

/**
 * Pamper authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pamper.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
