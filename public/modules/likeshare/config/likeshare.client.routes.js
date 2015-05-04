'use strict';

// Setting up route
angular.module('likeshare').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('likeshare', {
			url: '/',
			templateUrl: 'modules/likeshare/views/likeshare.client.view.html'
		});
	}
]);