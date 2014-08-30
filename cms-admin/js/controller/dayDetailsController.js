// JavaScript Document
app.controller("dayDetailsController", ['$scope', 'sharedEventDispatcher', '$filter', 'dayDetailServices','packServices', '$interval', '$location'
, function($scope, sharedEventDispatcher, $filter, dayDetailServices, packServices, $interval, $location){
  
	$scope.packform = {};
	$scope.packageId = sharedEventDispatcher.packageId;
	$scope.totalPackages = sharedEventDispatcher.totalPackages;  
	$scope.packform.info = "";
	$scope.packform.infoDisplay = false;

	


	$scope.setDetails = function(){
	   dayDetailServices.getDayDetails($scope.packform.packages_name, $scope);   
	};
	
	if($scope.packageId != 0){
		$scope.packform.packages_name = $scope.packageId;
		$scope.setDetails();
	}	
	
	$scope.$on('getDayDetails', function($event, data){
	    $scope.getSelectedPack = [];
		$scope.getSelectedPack =  $filter('getByPackageId')(data[0], $scope.packform.packages_name);
		for(i=0;i<$scope.getSelectedPack.length;i++){
			$scope.getSelectedPack[i].day_num = i + 1;
		}
		
	});
	
	$scope.$on('onAddSuccess', function($event){
		$scope.setDetails();
		$scope.packform.info = 'Updated Successfully..!';
		$interval(function(){
			$scope.packform.infoDisplay = false;
		},2000, 1);
		$scope.packform.infoDisplay = true;
	});
	
	
	$scope.$on('daysInserted', function(event){
		$scope.setDetails();
		var selectedDetails = $filter('getById')($scope.totalPackages, $scope.packform.packages_name);
		var insertDate = new Date();
		selectedDetails.package_duration = parseInt(selectedDetails.package_duration) + 1
		selectedDetails.MODIFIED_DATE = insertDate.toJSON(); 
		packServices.editPack(selectedDetails, $scope);		
	});
	
	$scope.$on('onDeleteSuccess', function($event){
		$scope.setDetails();
		var selectedDetails = $filter('getById')($scope.totalPackages, $scope.packform.packages_name);
		var insertDate = new Date();
		selectedDetails.package_duration = parseInt(selectedDetails.package_duration) - 1
		selectedDetails.MODIFIED_DATE = insertDate.toJSON(); 
		packServices.editPack(selectedDetails, $scope);		
	});
	
		$scope.$on('PackageEditedSuccess',function(event){		
			$scope.packform.info = "Day details updated..!";
			$interval(function(){
				$scope.packform.infoDisplay = false;
			},2000, 1);
			$scope.packform.infoDisplay = true;
		});
	
	$scope.addDay = function(){
		var insertDate = new Date();
		if($scope.getSelectedPack[0].package_id != undefined){
			 var sendObj = new Object();
			 sendObj.package_id = parseInt($scope.getSelectedPack[0].package_id);
			 sendObj.day_num = parseInt($scope.getSelectedPack.length) + 1;
			 sendObj.INSERT_DATE = insertDate.toJSON();
			 dayDetailServices.addDayDetails(sendObj,$scope);
		}
	}
		
	

	$scope.getPackValue = function(){
		$scope.setDetails();
	}
	
	
	$scope.addDetail = function(id){
		var selectedDetails = $filter('getById')($scope.getSelectedPack, id);
		var insertDate = new Date();
		selectedDetails.MODIFIED_DATE = insertDate.toJSON(); 
		dayDetailServices.editDayDetails(selectedDetails, $scope);  
	}
	
	$scope.deleteDetails = function(id){
		if (confirm('Are you sure you want to delete?')) {
			dayDetailServices.deleteDetails({'id':id}, $scope);  
		}
	}
	
	$scope.goToPackage = function(){
		$location.path("/packages");
	}
	
	$scope.gotoImageUpload = function(){
		$location.path("/packImages");
	}
	

}]);