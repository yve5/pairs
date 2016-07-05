'use strict';

var app = angular.module('app');

app.directive('audioPlayer', [function () {
  return {
    restrict: 'ACE',
    template: '<audio loop=""><source src="src/alone.ogg" type="audio/ogg"></audio>',
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
