'use strict';

//Setting up route
angular.module('pampers').config(['$stateProvider',
	function($stateProvider) {
		// Pampers state routing
		$stateProvider.
		state('listPampers', {
			url: '/pampers',
			templateUrl: 'modules/pampers/views/list-pampers.client.view.html'
		}).
		state('createPamper', {
			url: '/pampers/create',
			templateUrl: 'modules/pampers/views/create-pamper.client.view.html'
		}).
		state('viewPamper', {
			url: '/pampers/:pamperId',
			templateUrl: 'modules/pampers/views/view-pamper.client.view.html'
		}).
		state('editPamper', {
			url: '/pampers/:pamperId/edit',
			templateUrl: 'modules/pampers/views/edit-pamper.client.view.html'
		});
	}
]);