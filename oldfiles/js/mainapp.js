// JavaScript Document
/**
 * @author Kishore Kumar Unnikrishnan
 * Created Date - 05-05-2014 
 
-- Client : Glacier Holidays--
Version : 1.0
Updated on 10 July 2014 

-- About
	
Main Module File
	

*/

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
		  .when("/hotelList", 
			{	controller: "hotelList", 
				templateUrl: 'views/hoteldetails.html' 
			 })
		  .when("/hotelview", 
			{	controller: "hotelViewController", 
				templateUrl: 'views/hotelview.html' 
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



