'use strict';


var app = angular.module('app');


app.directive('game', ['$timeout', function ($timeout) {
  return {
    restrict: 'ACE',
    require: 'ngModel',
    templateUrl: 'html/game.html',
    link: function (scope, elm, attrs, ngModel) {

      scope.init = function () {
        scope.firstTile   = null;
        scope.secondTile  = null;
        scope.canPick     = true;
        scope.mfTimeout   = 1000;

        scope.renderer = new PIXI.autoDetectRenderer(640, 480, {'transparent': true});
        scope.renderer.backgroundColor = 0xB9F6CA;

        elm.html(scope.renderer.view);

        scope.stage = new PIXI.Container();

        PIXI.loader.add('tiles', 'img/tiles.json').load(scope.loadResources);
      };


      scope.loadResources = function (loader, resources) {
        // choose 24 random tile images
        var chosenTiles = new Array();
        var iii = 0, jjj, kkk;


        while (iii < 48) {
          var randomValue = _.random(0, 43);

          if (_.indexOf(chosenTiles, randomValue) === -1){
            chosenTiles.push(randomValue, randomValue);
            iii += 2;
          }
        }


        // shuffle the chosen tiles
        for (iii=0; iii<96; iii++){
          var from  = _.random(0, 47);
          var to    = _.random(0, 47);
          var tmp   = chosenTiles[from];

          chosenTiles[from] = chosenTiles[to];
          chosenTiles[to]   = tmp;
        }


        // place down tiles
        for (iii = 0; iii < 8; iii++) {
          for (jjj = 0; jjj < 6; jjj++) {
            kkk = iii * 6 + jjj;

            var tile = new PIXI.Sprite(resources['tiles'].textures[chosenTiles[kkk]]);

            tile.buttonMode   = true;
            tile.interactive  = true;
            tile.isSelected   = false;
            // tile.tint         = 0x000000;
            tile.alpha        = 1;
            tile.position.x   = 7 + iii * 80;
            tile.position.y   = 7 + jjj * 80;

            tile.mousedown = function (event) {
              console.log('mousedown', 'fail...');
            };

            scope.stage.addChild(tile);
          }
        }

        scope.animate();
      }

      scope.animate = function () {
        // requestAnimationFrame(scope.animate);
        scope.render();
      }

      scope.render = function () {
        // scope.tiles.rotation += 0.01;
        scope.renderer.render(scope.stage);
      }

      scope.init();
    }
  };
}]);