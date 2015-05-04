'use strict';

//Pampers service used to communicate Pampers REST endpoints
angular.module('pampers').factory('Pampers', ['$resource',
	function($resource) {
		return $resource('pampers/:pamperId', { pamperId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);