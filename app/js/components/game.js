'use strict';

var app = angular.module('app');

app.controller('game', ['$scope', '$http',
  function (scope, http) {

  	scope.cells = [
	    {name:'face'},
	    {name:'accessibility'},
	    {name:'extension'},
	    {name:'fingerprint'},
	    {name:'favorite'},
	    {name:'gavel'},
	    {name:'hourglass_full'},
	    {name:'motorcycle'},
	    {name:'polymer'},
	    {name:'settings_input_hdmi'},
	    {name:'shopping_cart'},
	    {name:'thumb_up'},
	    {name:'work'},
	    {name:'album'},
	    {name:'chat_bubble'},
	    {name:'phone'},
	    {name:'vpn_key'},
	    {name:'drafts'},
	    {name:'weekend'},
	    {name:'games'},
	    {name:'radio'},
	    {name:'remove_circle'},
	    {name:'sd_card'},
	    {name:'attach_file'},
	    {name:'cloud'},
	    {name:'keyboard'},
	    {name:'mouse'},
	    {name:'security'},
	    {name:'watch'},
	    {name:'wb_sunny'},
	    {name:'tag_faces'},
	    {name:'tune'},
	    {name:'directions_car'},
	    {name:'directions_run'},
	    {name:'directions_subway'},
	    {name:'map'},
	    {name:'restaurant'},
	    {name:'golf_course'},
	    {name:'cake'},
	    {name:'public'},
	    {name:'star'},
	    {name:'whatshot'},
	    {name:'local_bar'},
	    {name:'notifications'},
	    {name:'school'},
	    {name:'fitness_center'},
	    {name:'all_inclusive'},
	    {name:'beach_access'}
	  ];

  }]);
