'use strict';

// Configuring the Articles module
angular.module('pampers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Pampers', 'pampers', 'dropdown', '/pampers(/create)?');
		Menus.addSubMenuItem('topbar', 'pampers', 'List Pampers', 'pampers');
		Menus.addSubMenuItem('topbar', 'pampers', 'New Pamper', 'pampers/create');
	}
]);