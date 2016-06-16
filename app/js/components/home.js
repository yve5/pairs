'use strict';

var app = angular.module('app');

app.controller('home', ['$scope', '$http',
  function (scope, http) {

    scope.materialType = 'lambert';
    scope.dofillcontainer = true;
    scope.canvasHeight = 400;
  	scope.canvasWidth = 400;
    scope.scale = 1;

  }]);
