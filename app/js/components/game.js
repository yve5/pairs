'use strict';

var app = angular.module('app');


app.controller('home', ['$scope', '$http',
  function (scope, http) {

    scope.animation = function () {

      // requestAnimationFrame(scope.animation());

      scope.bunny.rotation += 0.01;


      scope.renderer.render(scope.stage);

    }

  }]);




app.directive('game', ['$timeout', function ($timeout) {
  return {
    restrict: 'ACE',
    require: 'ngModel',
    templateUrl: 'html/game.html',
    link: function (scope, elm, attrs, ngModel) {

      // You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
      // which will try to choose the best renderer for the environment you are in.

      scope.renderer = new PIXI.autoDetectRenderer(800, 600);
      // var g_renderer = new PIXI.autoDetectRenderer(800, 600); 
      elm.html(scope.renderer.view);


      scope.stage = new PIXI.Container();

      scope.bunny = null;


      PIXI.loader.add('bunny', 'img/bunny.png').load(function(loader, resources) {

        scope.bunny = new PIXI.Sprite(resources.bunny.texture);

        scope.bunny.position.x = 400;
        scope.bunny.position.y = 300;

        scope.bunny.scale.x = 2;
        scope.bunny.scale.y = 2;

        scope.stage.addChild(scope.bunny);

        // g_animate();

        scope.animation();

      });





      // ngModel.$setViewValue(elm.data('DateTimePicker').date());

      // elm.on('dp.change', function (event) {
      //   // if(!scope.$$phase) {}
      //   $timeout(function() {
      //     scope.$apply(function () {
      //       ngModel.$setViewValue(event.date);
      //     });
      //   });
      // });

      // ngModel.$render = function () {
      //   elm.data('DateTimePicker').date(ngModel.$viewValue);
      // };




    }
  };
}]);





function g_animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(g_animate);

    // each frame we spin the bunny around a bit
    // scope.bunny.rotation += 0.01;

    // this is the main render call that makes pixi draw your container and its children.
    // g_renderer.render(stage);
}








// // You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
// // which will try to choose the best renderer for the environment you are in.
// var renderer = new PIXI.autoDetectRenderer(800, 600);

// // The renderer will create a canvas element for you that you can then insert into the DOM.
// var playzone = document.getElementById('playzone');

// playzone.appendChild(renderer.view);

// // document.body.appendChild(renderer.view);

// // You need to create a root container that will hold the scene you want to draw.
// var stage = new PIXI.Container();
// var bunny;

// // Declare a global variable for our sprite so that the animate function can access it.
// var bunny = null;

// // load the texture we need
// PIXI.loader.add('bunny', 'img/bunny.png').load(function (loader, resources) {
//     // This creates a texture from a 'bunny.png' image.
//     bunny = new PIXI.Sprite(resources.bunny.texture);

//     // Setup the position and scale of the bunny
//     bunny.position.x = 400;
//     bunny.position.y = 300;

//     bunny.scale.x = 2;
//     bunny.scale.y = 2;

//     // Add the bunny to the scene we are building.
//     stage.addChild(bunny);

//     // kick off the animation loop (defined below)
//     animate();
// });





// function animate() {
//     // start the timer for the next animation loop
//     requestAnimationFrame(animate);

//     // each frame we spin the bunny around a bit
//     bunny.rotation += 0.01;

//     // this is the main render call that makes pixi draw your container and its children.
//     renderer.render(stage);
// }
