'use strict';

// Bottles controller


var bottlesApp = angular.module('bottles');

bottlesApp.controller('BottlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bottles', '$modal', '$log',
	function($scope, $stateParams, $location, Authentication, Bottles, $modal, $log) {

		this.authentication = Authentication;

		// Find a list of Bottles
			this.bottles = Bottles.query();

		//open modal window to update single record
		this.modalUpdate = function (size, selectedBottle) {

			var modalInstance = $modal.open({
				templateUrl: 'modules/bottles/views/edit-bottle.client.view.html',
				controller: function ($scope, $modalInstance, bottle) {
					$scope.bottle = bottle;

					$scope.ok = function () {

						if (updateBottleForm.$valid) {
							$modalInstance.close($scope.bottle);
						}
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};

				},
				size: size,
				resolve: {
					bottle: function () {
						return selectedBottle;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};


	}
]);

bottlesApp.controller('BottlesCreateController', ['$scope', 'Bottles',
	function($scope, Bottles) {

	}

]);

bottlesApp.controller('BottlesUpdateController', ['$scope', 'Bottles',
	function($scope, Bottles) {

// Update existing Customer
		this.update = function(updatedBottle) {
			var bottle = updatedBottle;

			bottle.$update(function() {

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);

		//// Create new Bottle
		//$scope.create = function() {
		//	// Create new Bottle object
		//	var bottle = new Bottles ({
		//		breast: this.breast,
		//		SpecificTime: this.SpecificTime,
		//		amount: this.amount,
		//		comment: this.comment
        //
		//	});
        //
		//	// Redirect after save
		//	bottle.$save(function(response) {
		//		$location.path('bottles/' + response._id);
        //
		//		// Clear form fields
		//		$scope.SpecificTime = '';
		//		$scope.breast = '';
		//		$scope.bottle = '';
		//		$scope.comment = '';
		//		$scope.amount = '';
		//	}, function(errorResponse) {
		//		$scope.error = errorResponse.data.message;
		//	});
		//};
        //
		//// Remove existing Bottle
		//$scope.remove = function(bottle) {
		//	if ( bottle ) {
		//		bottle.$remove();
        //
		//		for (var i in $scope.bottles) {
		//			if ($scope.bottles [i] === bottle) {
		//				$scope.bottles.splice(i, 1);
		//			}
		//		}
		//	} else {
		//		$scope.bottle.$remove(function() {
		//			$location.path('bottles');
		//		});
		//	}
		//};
        //
		//// Update existing Bottle
		//$scope.update = function() {
		//	var bottle = $scope.bottle;
        //
		//	bottle.$update(function() {
		//		$location.path('bottles/' + bottle._id);
		//	}, function(errorResponse) {
		//		$scope.error = errorResponse.data.message;
		//	});
		//};
        //
        //
		//// Find existing Bottle
		//$scope.findOne = function() {
		//	$scope.bottle = Bottles.get({
		//		bottleId: $stateParams.bottleId
		//	});
		//};