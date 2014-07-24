app.controller("loginController", function($scope, $location, $rootScope, loginServices){
	
 $rootScope.$broadcast('showHideNaveBar', [false]);
 $scope.user={};
 $scope.isInvalid = false;
 $scope.isNavBar = false;

	$scope.login = function(){
		$scope.user.admin_username = $scope.admin_username;
		$scope.user.admin_password = $scope.admin_password,
		loginServices.loginUser($scope.user, $scope);
	}

	$scope.$on('loginSuccess',function(event){
		$rootScope.$broadcast('showHideNaveBar', [true]);
		$scope.clearError();
		$scope.admin_username="";
		$scope.admin_password="";	
	 	$scope.isNavBar = false;
	
		//Redirect
		$location.path("/packages");
	});
	
	$scope.clearError = function(){
		$scope.invalidUser="";
		$scope.isInvalid = false;		
	};
	
	$scope.$on('loginFailure',function(event){
		$scope.invalidUser="Invalid User";
		$scope.isInvalid = true;
		$scope.admin_username="";
		$scope.admin_password="";
	});
	
});




app.controller("reportsController", function($scope){

});


app.controller("passwordController", function($scope){

});