'use strict';

var app = angular.module('app');

app.controller('game', ['$scope', '$http', '$timeout', '$rootScope', 
	function (scope, http, timeout, rootScope) {

		scope.init = function () {
			// Google material glyphicons
			scope.icons = ['face', 'accessibility', 'extension', 'fingerprint', 'favorite', 'gavel', 'hourglass_full', 'motorcycle', 'polymer', 'settings_input_hdmi', 'shopping_cart', 'thumb_up', 'work', 'album', 'chat_bubble', 'phone', 'vpn_key', 'drafts', 'weekend', 'games', 'radio', 'remove_circle', 'sd_card', 'attach_file', 'cloud', 'keyboard', 'mouse', 'security', 'watch', 'wb_sunny', 'tag_faces', 'tune', 'directions_car', 'directions_run', 'directions_subway', 'map', 'restaurant', 'golf_course', 'cake', 'public', 'star', 'whatshot', 'local_bar', 'notifications', 'school', 'fitness_center', 'all_inclusive', 'beach_access'];

			// plain variable
			scope.canPick 		= true;
			scope.selection 	= null;
			scope.first 		= null;
			scope.second 		= null;
			scope.time  		= 1000;
			scope.total			= 48;
			scope.clicks		= 0;
			rootScope.gameOver 	= false;

	  		// choose 24 random tile images
	  		scope.tiles = [];
	  		var iii = 0;

	  		while (iii < scope.total) {
	  			var iconName = scope.icons[_.random(0, scope.icons.length - 1)];

	          	if (_.isUndefined(_.find(scope.tiles, { 'name': iconName }))) {
					scope.tiles.push({'id' : iii++, 'name' : iconName, 'isSelected' : false, 'isRemoved' : false});
					scope.tiles.push({'id' : iii++, 'name' : iconName, 'isSelected' : false, 'isRemoved' : false});
				}
			}

	        // shuffle the chosen tiles
	        scope.tiles = _.shuffle(scope.tiles);
	    }

	    scope.chooseTile = function (index) {
	    	if (scope.canPick) {
	    		if (scope.tiles[index].isSelected === false && scope.tiles[index].isRemoved === false) {
	    			scope.tiles[index].isSelected = true;
	    			scope.clicks++;

	    			if (_.isNull(scope.first)) {
	    				scope.first = index;
	    			}
	    			else {
	    				if (_.isNull(scope.second)) {
	    					scope.second = index;
	    					scope.canPick = false;

	    					if (scope.tiles[scope.first].name === scope.tiles[scope.second].name) {
	    						// The tiles are matched
	    						timeout(scope.removeTiles, scope.time);
	    					}
	    					else {
	    						// The tiles are not matched
	    						timeout(scope.resetTiles, scope.time);
	    					}
	    				}
	    			}
	    		}
	    	}
	    }

	    scope.resetTiles = function () {
	    	// the tiles can be clicked
	    	scope.canPick = true;

	    	// the tiles are deselected
	    	scope.tiles[scope.first].isSelected		= false;
	    	scope.tiles[scope.second].isSelected 	= false;

	    	// the selection is clear
	    	scope.first		= null;
	    	scope.second	= null;
	    }

	    scope.removeTiles = function () {
	    	// the tiles can be clicked
	    	scope.canPick = true;

	    	// the tiles are deselected
	    	scope.tiles[scope.first].isSelected 	= false;
	    	scope.tiles[scope.second].isSelected 	= false;

	    	// the tiles are removed
	    	scope.tiles[scope.first].isRemoved 	= true;
	    	scope.tiles[scope.second].isRemoved = true;

	    	// the selection is clear
	    	scope.first 	= null;
	    	scope.second 	= null;

	    	// if all tiles haved been matched, we reset the game
	    	if (_.isUndefined(_.find(scope.tiles, { 'isRemoved' : false }))) {
	    		timeout(scope.gameIsOver, scope.time);
	    	}
	    }

	    scope.gameIsOver = function () {
	    	rootScope.gameOver = true;
	    	timeout(scope.init, scope.time);
	    }

		scope.init();

}]);
