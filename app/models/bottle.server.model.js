'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Bottle Schema
 */
var BottleSchema = new Schema({
	SpecificTime: {
		type: String,
		default: '',
		trim: true
	},
	breast: {
		type: Boolean
	},
	bottle: {
		type: Boolean
	},
	amount: {
		type: String,
		default: '',
		trim: true
	},
	comment: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Bottle', BottleSchema);