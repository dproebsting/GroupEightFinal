'use strict';

// Configuring the Articles module
angular.module('bottles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Bottles', 'bottles', 'dropdown', '/bottles(/create)?');
		Menus.addSubMenuItem('topbar', 'bottles', 'List Bottles', 'bottles');
		Menus.addSubMenuItem('topbar', 'bottles', 'New Bottle', 'bottles/create');
	}
]);