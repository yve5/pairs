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
    	.when('/home', {
	      templateUrl: 'html/home.html',
	      controller: 'home',
	      controllerAs: 'home'
	    })
	    .otherwise({
	      redirectTo: '/'
	    });
  }]);
