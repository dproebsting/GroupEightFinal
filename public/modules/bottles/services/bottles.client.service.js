'use strict';

//Bottles service used to communicate Bottles REST endpoints
angular.module('bottles').factory('Bottles', ['$resource',
	function($resource) {
		return $resource('bottles/:bottleId', { bottleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);