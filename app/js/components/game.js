'use strict';

var app = angular.module('app');

app.controller('game', ['$scope', '$http',
	function (scope, http) {

		scope.init = function () {
	  		scope.canPick = true;
	  		scope.selection = null;
	  		scope.firstTile = null;
	  		scope.secondTile = null;

	  		// choose 24 random tile images
	  		scope.chosenTiles = [];
	  		var iii = 0;

	  		while (iii < 48) {
	  			var iconName = scope.icons[_.random(0, scope.icons.length - 1)];

	          	if (_.isUndefined(_.find(scope.chosenTiles, { 'name': iconName }))) {
					scope.chosenTiles.push({'id' : iii++, 'name' : iconName});
					scope.chosenTiles.push({'id' : iii++, 'name' : iconName});
				}
			}

	        // shuffle the chosen tiles
	        scope.chosenTiles = _.shuffle(scope.chosenTiles);

	        // _.forEach(scope.chosenTiles, function (item) {
	        // 	console.log(item);
	        // })

	    }

	    scope.chooseTile = function (id) {

	    	// if (scope.canPick) {
	    		console.log('canPick', id, _.isNull(scope.selection));

	    		if (_.isNull(scope.selection)) {
	    			console.log('selection');

	    			scope.selection = id;

	    			if (_.isNull(scope.firstTile)) {
	    				scope.firstTile = id;
	    			}
	    			else {
		    			if (_.isNull(scope.secondTile)) {
		    				scope.secondTile = id;
		    				console.log('Hello', 'World');
		    				scope.canPick = false;
		    			}
	    			}
	    		}

	    	// 	scope.canPick = false;
	    	// }

	    }



		// Google material glyphicons
		scope.icons = ['face', 'accessibility', 'extension', 'fingerprint', 'favorite', 'gavel', 'hourglass_full', 'motorcycle', 'polymer', 'settings_input_hdmi', 'shopping_cart', 'thumb_up', 'work', 'album', 'chat_bubble', 'phone', 'vpn_key', 'drafts', 'weekend', 'games', 'radio', 'remove_circle', 'sd_card', 'attach_file', 'cloud', 'keyboard', 'mouse', 'security', 'watch', 'wb_sunny', 'tag_faces', 'tune', 'directions_car', 'directions_run', 'directions_subway', 'map', 'restaurant', 'golf_course', 'cake', 'public', 'star', 'whatshot', 'local_bar', 'notifications', 'school', 'fitness_center', 'all_inclusive', 'beach_access'];

		scope.init();

}]);
