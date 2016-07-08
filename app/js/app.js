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
    	.when('/help', {
	      templateUrl: 'html/help.html',
	      controller: 'help',
	      controllerAs: 'help'
	    })
	    .otherwise({
	      redirectTo: '/'
	    });
  }]);
