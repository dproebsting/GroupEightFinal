'use strict';

(function() {
	// Pampers Controller Spec
	describe('Pampers Controller Tests', function() {
		// Initialize global variables
		var PampersController,
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

			// Initialize the Pampers controller.
			PampersController = $controller('PampersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Pamper object fetched from XHR', inject(function(Pampers) {
			// Create sample Pamper using the Pampers service
			var samplePamper = new Pampers({
				name: 'New Pamper'
			});

			// Create a sample Pampers array that includes the new Pamper
			var samplePampers = [samplePamper];

			// Set GET response
			$httpBackend.expectGET('pampers').respond(samplePampers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pampers).toEqualData(samplePampers);
		}));

		it('$scope.findOne() should create an array with one Pamper object fetched from XHR using a pamperId URL parameter', inject(function(Pampers) {
			// Define a sample Pamper object
			var samplePamper = new Pampers({
				name: 'New Pamper'
			});

			// Set the URL parameter
			$stateParams.pamperId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/pampers\/([0-9a-fA-F]{24})$/).respond(samplePamper);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pamper).toEqualData(samplePamper);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Pampers) {
			// Create a sample Pamper object
			var samplePamperPostData = new Pampers({
				name: 'New Pamper'
			});

			// Create a sample Pamper response
			var samplePamperResponse = new Pampers({
				_id: '525cf20451979dea2c000001',
				name: 'New Pamper'
			});

			// Fixture mock form input values
			scope.name = 'New Pamper';

			// Set POST response
			$httpBackend.expectPOST('pampers', samplePamperPostData).respond(samplePamperResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Pamper was created
			expect($location.path()).toBe('/pampers/' + samplePamperResponse._id);
		}));

		it('$scope.update() should update a valid Pamper', inject(function(Pampers) {
			// Define a sample Pamper put data
			var samplePamperPutData = new Pampers({
				_id: '525cf20451979dea2c000001',
				name: 'New Pamper'
			});

			// Mock Pamper in scope
			scope.pamper = samplePamperPutData;

			// Set PUT response
			$httpBackend.expectPUT(/pampers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pampers/' + samplePamperPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid pamperId and remove the Pamper from the scope', inject(function(Pampers) {
			// Create new Pamper object
			var samplePamper = new Pampers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Pampers array and include the Pamper
			scope.pampers = [samplePamper];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/pampers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePamper);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.pampers.length).toBe(0);
		}));
	});
}());