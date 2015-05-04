'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Bottle = mongoose.model('Bottle'),
	_ = require('lodash');

/**
 * Create a Bottle
 */
exports.create = function(req, res) {
	var bottle = new Bottle(req.body);
	bottle.user = req.user;

	bottle.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bottle);
		}
	});
};

/**
 * Show the current Bottle
 */
exports.read = function(req, res) {
	res.jsonp(req.bottle);
};

/**
 * Update a Bottle
 */
exports.update = function(req, res) {
	var bottle = req.bottle ;

	bottle = _.extend(bottle , req.body);

	bottle.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bottle);
		}
	});
};

/**
 * Delete an Bottle
 */
exports.delete = function(req, res) {
	var bottle = req.bottle ;

	bottle.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bottle);
		}
	});
};

/**
 * List of Bottles
 */
exports.list = function(req, res) { 
	Bottle.find().sort('-created').populate('user', 'displayName').exec(function(err, bottles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bottles);
		}
	});
};

/**
 * Bottle middleware
 */
exports.bottleByID = function(req, res, next, id) { 
	Bottle.findById(id).populate('user', 'displayName').exec(function(err, bottle) {
		if (err) return next(err);
		if (! bottle) return next(new Error('Failed to load Bottle ' + id));
		req.bottle = bottle ;
		next();
	});
};

/**
 * Bottle authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.bottle.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
