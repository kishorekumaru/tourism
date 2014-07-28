// JavaScript Document
// JavaScript Document
var app = angular.module("glacierNav", ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider){
	$routeProvider
		  .when("/", 
			{ 
				controller: "packageList", 
				templateUrl: 'views/packagedetails.html' 
			 })
		  .when("/packview", 
			{ 
				controller: "packViewController", 
				templateUrl: 'views/packview.html' 
			 })
			
			 .otherwise({ redirectTo:"/"});
});


