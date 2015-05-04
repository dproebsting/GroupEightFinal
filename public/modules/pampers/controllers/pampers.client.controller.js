'use strict';

// Pampers controller
angular.module('pampers').controller('PampersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pampers',
	function($scope, $stateParams, $location, Authentication, Pampers) {
		$scope.authentication = Authentication;

		// Create new Pamper
		$scope.create = function() {
			// Create new Pamper object
			var pamper = new Pampers ({
				diaper: this.diaper,
				comment: this.comment
			});

			// Redirect after save
			pamper.$save(function(response) {
				$location.path('pampers/' + response._id);

				// Clear form fields
				$scope.diaper = '';
				$scope.comment = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Pamper
		$scope.remove = function(pamper) {
			if ( pamper ) { 
				pamper.$remove();

				for (var i in $scope.pampers) {
					if ($scope.pampers [i] === pamper) {
						$scope.pampers.splice(i, 1);
					}
				}
			} else {
				$scope.pamper.$remove(function() {
					$location.path('pampers');
				});
			}
		};

		// Update existing Pamper
		$scope.update = function() {
			var pamper = $scope.pamper;

			pamper.$update(function() {
				$location.path('pampers/' + pamper._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pampers
		$scope.find = function() {
			$scope.pampers = Pampers.query();
		};

		// Find existing Pamper
		$scope.findOne = function() {
			$scope.pamper = Pampers.get({ 
				pamperId: $stateParams.pamperId
			});
		};
	}
]);