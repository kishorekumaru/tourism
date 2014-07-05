app.controller("packageController", function($scope, $rootScope, $modal, $location, $filter, packServices){

	
	$scope.packages= "";
	$scope.itemsPerPage = 2;
	$scope.isNameASC = "ASC";
	$scope.isCostASC = "ASC";
	$scope.currentPage = 1;
	
   
  
	packServices.getPackages($scope);
	
	$scope.$on('loadPackDetails',function(event, data){
		$scope.packages  = data[0].data;
		$scope.totalItems =  $scope.packages.length;
		$scope.packPage = $scope.packages.slice(0, $scope.itemsPerPage);
		$scope.currentPage = 1;
	});
	
	$scope.$on('reloadPackDetails', function(event){
		packServices.getPackages($scope);
		$scope.currentPage = 1;
	});
	
	
	$scope.sortByName = function(){
		//Toggle SORT Values
		($scope.isNameASC == "ASC")?$scope.isNameASC="DESC":$scope.isNameASC="ASC";
		packServices.getPackByOrder({'col':"package_name",'ORDER':$scope.isNameASC},$scope);
	};
	
	$scope.sortByCost = function(){
		($scope.isCostASC == "ASC")?$scope.isCostASC="DESC":$scope.isCostASC="ASC";
		packServices.getPackByOrder({'col':"package_cost",'ORDER':$scope.isCostASC},$scope);
	};
	
	$scope.getChar = function($event){
		var selectedDetails;
		if($event.target.value != ""){
			selectedDetails = $filter('filter')($scope.packages, $event.target.value)
			$scope.totalItems =  selectedDetails.length;
			$scope.packPage = selectedDetails.slice(0, $scope.itemsPerPage);
		}else{				
			$scope.totalItems =  $scope.packages.length;
			$scope.packPage = $scope.packages.slice(0, $scope.itemsPerPage);
		}
		$scope.currentPage = 1;
	};
	
	$scope.pageChanged = function(currentPage){
		var start = (currentPage-1) * $scope.itemsPerPage;
		var end = start + $scope.itemsPerPage;
		$scope.packPage = $scope.packages.slice(start,end);
	};
	
	$scope.editPackItem = function (id){
		
		var selectedDetails = $filter('getById')($scope.packages, id);
		$rootScope.$emit("editPackages",[selectedDetails]);
		$location.path("/addPackages");
	};
	

	
	$scope.deletePackage = function (id){
		if (confirm('Are you sure you want to delete?')) {
    		packServices.deletePack({'id':id},$scope);
		} 
	};




});


app.controller("packagePopUpController",function ($scope, $modal, hotelAddServices) {

  $scope.openWindow = function () {

    var modalInstance = $modal.open({
      templateUrl: 'myPackageContent.html',
      controller: packPopUpControllerIns,
	  resolve: {
        headerName: function () {
          return "Add Package Details";
			},
		  selectedDetails: function(){
		  	return "";
		  }
		  }
	});

    modalInstance.result.then(function (userItems) {
		  hotelAddServices.addHotels(userItems, $scope);
		});
   };
  
});


var packPopUpControllerIns = function ($scope, $modalInstance, headerName, selectedDetails) {
  $scope.headerName = headerName;
  $scope.hotel = {};
  $scope.data = {};

  var insertDate = new Date();
  
  if(selectedDetails != ""){

	  $scope.hotel.modified_date = insertDate.toJSON(); 
  }else{   
	   $scope.hotel.insert_date = insertDate.toJSON();
  }
  
 
 

  $scope.saveChanges = function () {
		
		$modalInstance.close($scope.hotel);
	 
  };

	
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};