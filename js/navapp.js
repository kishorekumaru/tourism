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
			
			 .otherwise({ redirectTo:"/"});
});


