// JavaScript Document
var app = angular.module("glacierHolidays", ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider){
	$routeProvider
		  .when("/", 
			{ 
				controller: "mainViewController", 
				templateUrl: 'views/mainView.html' 
			 })
		  .when("/packList", 
			{	controller: "packageList", 
				templateUrl: 'views/packagedetails.html' 
			 })
		  .when("/packview", 
			{ 
				controller: "packViewController", 
				templateUrl: 'views/packview.html' 
			 })
			 .when("/services", 
			{ 
				controller: "", 
				templateUrl: 'views/services.html' 
			 })
			 .when("/destinations", 
			{ 
				controller: "", 
				templateUrl: 'views/destination.html' 
			 })
			  .when("/testimonial", 
			{ 
				controller: "testimonialController", 
				templateUrl: 'views/testimonial.html' 
			 })
			   .when("/news", 
			{ 
				controller: "newsController", 
				templateUrl: 'views/newsupdates.html' 
			 })
			 .when("/contactus", 
			{ 
				controller: "contactController", 
				templateUrl: 'views/contactus.html' 
			 }) 
			
			
			 .otherwise({ redirectTo:"/"});
});


app.controller("headerController", function($scope, $location){ 


$location.path("/");
$scope.isHome = false;

	
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
	
	$scope.loadFiles = function(redirectPage){


		$location.path(redirectPage);
	};
	

	

	
});



