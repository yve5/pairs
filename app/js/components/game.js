'use strict';

var app = angular.module('app');

app.directive('game', ['$timeout', function ($timeout) {
  return {
    restrict: 'ACE',
    require: 'ngModel',
    templateUrl: 'html/game.html',
    link: function (scope, elm, attrs, ngModel) {

      scope.init = function() {
        // You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
        // which will try to choose the best renderer for the environment you are in.
        scope.renderer = new PIXI.autoDetectRenderer(800, 600);

        // The renderer will create a canvas element for you that you can then insert into the DOM.
        elm.html(scope.renderer.view);

        // You need to create a root container that will hold the scene you want to draw.
        scope.stage = new PIXI.Container();

        // Declare a global variable for our sprite so that the animate function can access it.
        scope.bunny = null;


        PIXI.loader.add('bunny', 'img/bunny.png').load(function(loader, resources) {
          scope.bunny = new PIXI.Sprite(resources.bunny.texture);

          scope.bunny.position.x = 400;
          scope.bunny.position.y = 300;

          scope.bunny.scale.x = 2;
          scope.bunny.scale.y = 2;

          scope.stage.addChild(scope.bunny);

          scope.animate();
        });

      };


      scope.animate = function() {
        // start the timer for the next animation loop
        requestAnimationFrame(scope.animate);

        scope.render();
      }


      scope.render = function() {
        // each frame we spin the bunny around a bit
        scope.bunny.rotation += 0.01;

        // this is the main render call that makes pixi draw your container and its children.
        scope.renderer.render(scope.stage);
      }

      scope.init();

    }
  };
}]);
