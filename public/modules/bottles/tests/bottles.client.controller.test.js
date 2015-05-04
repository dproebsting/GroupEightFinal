'use strict';

(function() {
	// Bottles Controller Spec
	describe('Bottles Controller Tests', function() {
		// Initialize global variables
		var BottlesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Bottles controller.
			BottlesController = $controller('BottlesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Bottle object fetched from XHR', inject(function(Bottles) {
			// Create sample Bottle using the Bottles service
			var sampleBottle = new Bottles({
				name: 'New Bottle'
			});

			// Create a sample Bottles array that includes the new Bottle
			var sampleBottles = [sampleBottle];

			// Set GET response
			$httpBackend.expectGET('bottles').respond(sampleBottles);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bottles).toEqualData(sampleBottles);
		}));

		it('$scope.findOne() should create an array with one Bottle object fetched from XHR using a bottleId URL parameter', inject(function(Bottles) {
			// Define a sample Bottle object
			var sampleBottle = new Bottles({
				name: 'New Bottle'
			});

			// Set the URL parameter
			$stateParams.bottleId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/bottles\/([0-9a-fA-F]{24})$/).respond(sampleBottle);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bottle).toEqualData(sampleBottle);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Bottles) {
			// Create a sample Bottle object
			var sampleBottlePostData = new Bottles({
				name: 'New Bottle'
			});

			// Create a sample Bottle response
			var sampleBottleResponse = new Bottles({
				_id: '525cf20451979dea2c000001',
				name: 'New Bottle'
			});

			// Fixture mock form input values
			scope.name = 'New Bottle';

			// Set POST response
			$httpBackend.expectPOST('bottles', sampleBottlePostData).respond(sampleBottleResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Bottle was created
			expect($location.path()).toBe('/bottles/' + sampleBottleResponse._id);
		}));

		it('$scope.update() should update a valid Bottle', inject(function(Bottles) {
			// Define a sample Bottle put data
			var sampleBottlePutData = new Bottles({
				_id: '525cf20451979dea2c000001',
				name: 'New Bottle'
			});

			// Mock Bottle in scope
			scope.bottle = sampleBottlePutData;

			// Set PUT response
			$httpBackend.expectPUT(/bottles\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/bottles/' + sampleBottlePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid bottleId and remove the Bottle from the scope', inject(function(Bottles) {
			// Create new Bottle object
			var sampleBottle = new Bottles({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Bottles array and include the Bottle
			scope.bottles = [sampleBottle];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/bottles\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBottle);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.bottles.length).toBe(0);
		}));
	});
}());