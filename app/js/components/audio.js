'use strict';

var app = angular.module('app');

app.directive('audioPlayer', ['$timeout', function ($timeout) {
  return {
    restrict: 'ACE',
    template: '<audio controlsa="" loop=""><source src="doc/alone.ogg" type="audio/ogg"></audio>',
    link: function (scope, elm, attrs, ngModel) {
        var audioTag = elm[0].childNodes[0];

        scope.$watch('isPaused', function (newVal, oldVal) {
            if (newVal) {
                audioTag.pause();
            }
            else {
                audioTag.play();
            }
        });
    }
  };
}]);
