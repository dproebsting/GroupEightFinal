'use strict';

//Setting up route
angular.module('bottles').config(['$stateProvider',
	function($stateProvider) {
		// Bottles state routing
		$stateProvider.
		state('listBottles', {
			url: '/bottles',
			templateUrl: 'modules/bottles/views/list-bottles.client.view.html'
		}).
		state('createBottle', {
			url: '/bottles/create',
			templateUrl: 'modules/bottles/views/create-bottle.client.view.html'
		}).
		state('viewBottle', {
			url: '/bottles/:bottleId',
			templateUrl: 'modules/bottles/views/view-bottle.client.view.html'
		}).
		state('editBottle', {
			url: '/bottles/:bottleId/edit',
			templateUrl: 'modules/bottles/views/edit-bottle.client.view.html'
		});
	}
]);