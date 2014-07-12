// JavaScript Document
var app = angular.module("glacierAdmin", ['ngRoute', 'ui.bootstrap', 'angularFileUpload']);

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
			  .when("/dayDetails", 
			{ 
				 	controller: "dayDetailsController", 
					templateUrl: 'com/views/datDetails.html' 
			 })
			   .when("/linkHotels", 
			{ 
				 	controller: "linkHotelController", 
					templateUrl: 'com/views/linkHotels.html' 
			 })
			 .when("/addPackages", 
			{ 
					templateUrl: 'com/views/addPackages.html' 
			 })
			 .when("/packImages", 
			{ 
				 	controller: "uploadImgController", 
					templateUrl: 'com/views/packageImageDetails.html' 
			 })
			 .when("/hotelImages", 
			{ 
				 	controller: "uploadHotelImgController", 
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
			  .when("/viewPackages", 
			{ 
				 	controller: "passwordController", 
					templateUrl: 'com/views/changePassword.html' 
			 })
			  .when("/viewHotels", 
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

app.filter('myDateFormat',function myDateFormat($filter){
	return function(text){
		var  tempdate= new Date(text.replace(/-/g,"/"));
	return $filter('date')(tempdate, 'dd/MM/yyyy');
	}
})

app.run(function($rootScope, $location, loginServices){
	
	var packagePermission = ['/packages'];
	var reportPermission = ['/reports'];
	var changepwdPermission = ['/changepassword'];
	var dayDetailsPermission = ['/dayDetails'];
	var addPackagePermission = ['/addPackages'];
	var linkHotelPermission = ['/linkHotels'];
	
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
		else if(dayDetailsPermission.indexOf($location.path()) != -1 && !loginServices.islogged()){
			$location.path("/");
		}
		else if(addPackagePermission.indexOf($location.path()) != -1 && !loginServices.islogged()){
			$location.path("/");
		}
		else if(linkHotelPermission.indexOf($location.path()) != -1 && !loginServices.islogged()){
			$location.path("/");
		}
		
	});
});