'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Pamper Schema
 */
var PamperSchema = new Schema({
	diaper: {
		type: String,
		default: '',
		required: 'Please fill Pamper name',
		trim: true
	},
	comment: {
		type: String,
		default: '',
		required: 'Please fill Pamper name',
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

mongoose.model('Pamper', PamperSchema);