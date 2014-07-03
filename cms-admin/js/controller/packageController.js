// JavaScript Document
app.controller("packageController", function($scope, hotelServices){
	$scope.headerName = "Employee Details";
	$scope.hotelDetails = "";
	$scope.itemsPerPage = 5;
	
	hotelServices.getHotels($scope);
	
	$scope.$on('loadDetails',function(event, data){
		$scope.hotelDetails  = data[0].data;
		$scope.totalItems =  $scope.hotelDetails.length;
		$scope.hotelDetailsPage = $scope.hotelDetails.slice(0, $scope.itemsPerPage);
		$scope.currentPage = 1;
	});
	
	$scope.pageChanged = function(currentPage){
		var start = (currentPage-1) * $scope.itemsPerPage;
		var end = start + $scope.itemsPerPage;
		$scope.hotelDetailsPage = $scope.hotelDetails.slice(start,end);
	};
	
	$scope.editUserItem = function (id){
	};
	
	$scope.deleteUserItem = function (id){
	};

});


