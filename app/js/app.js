'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
    	.when('/', {
	      templateUrl: 'html/game.html',
	      controller: 'game',
	      controllerAs: 'game'
	    })
	    .otherwise({
	      redirectTo: '/'
	    });
  }]);
