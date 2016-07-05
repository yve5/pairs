'use strict';


var app = angular.module('app');


app.directive('game', ['$timeout', function ($timeout) {
  return {
    restrict: 'ACE',
    require: 'ngModel',
    // templateUrl: 'html/game.html',
    link: function (scope, elm, attrs, ngModel) {

      console.log('Hello World');

    }
  };
}]);