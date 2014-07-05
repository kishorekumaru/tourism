// JavaScript Document
var app = angular.module("glacierAdmin", ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(function($routeProvider){
	$routeProvider
		  .when("/", 
			{ 
				 	controller: "loginController", 
					templateUrl: 'com/views/loginDetails.html' 
			 })
			.when("/packages", 
			{ 
				 	controller: "packageController", 
					templateUrl: 'com/views/packageDetails.html' 
			 })
			 .when("/hotels", 
			{ 
				 	controller: "hotelController", 
					templateUrl: 'com/views/hotelDetails.html' 
			 })
			 .when("/addPackages", 
			{ 
					templateUrl: 'com/views/addPackages.html' 
			 })
			 .when("/packImages", 
			{ 
				 	controller: "packageController", 
					templateUrl: 'com/views/packageImageDetails.html' 
			 })
			 .when("/hotelImages", 
			{ 
				 	controller: "packageController", 
					templateUrl: 'com/views/hotelImageDetails.html' 
			 })
			.when("/reports", 
			{ 
				 	controller: "reportsController", 
					templateUrl: 'com/views/reportDetails.html' 
			 })
			 .when("/changepassword", 
			{ 
				 	controller: "passwordController", 
					templateUrl: 'com/views/changePassword.html' 
			 })
			 .otherwise({ redirectTo:"/"});
});


app.controller("headerController", function($scope, $location, loginServices){ 

$scope.isNavBar=false;
$location.path("/");

    $scope.$on('showHideNaveBar',function(event, isNavBar){
		$scope.isNavBar = isNavBar;
		if(!isNavBar){
			$location.path("/");
		}
	});
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
	
	$scope.loadFiles = function(redirectPage){
		$location.path(redirectPage);
	};
	
	$scope.logOut = function(){
		loginServices.logOutUser();
	};
	

	
});



app.run(function($rootScope, $location, loginServices){
	
	var packagePermission = ['/packages'];
	var reportPermission = ['/reports'];
	var changepwdPermission = ['/changepassword'];
	$rootScope.editPackagesRetour = {}; 
	$rootScope.$on('editPackages', function(event, selectedDetails){
		
		$rootScope.editPackagesRetour = selectedDetails[0];
	});
	
	$rootScope.$on("$routeChangeStart",function(){
		if(packagePermission.indexOf($location.path()) != -1 && !loginServices.islogged()){
			$location.path("/");
		}else if(reportPermission.indexOf($location.path()) != -1 && !loginServices.islogged()){
			$location.path("/");
		}else if(changepwdPermission.indexOf($location.path()) != -1 && !loginServices.islogged()){
			$location.path("/");
		}
	});
});