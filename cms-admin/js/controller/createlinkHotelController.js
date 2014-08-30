// JavaScript Document

app.controller("createlinkHotelController", function($scope, $modal, $filter,  $location, sharedEventDispatcher,  linkHotelServices){
	
		$scope.linkHotelDetails = "";
		$scope.itemsPerPage = 10;
		$scope.isNameASC = "ASC";
		$scope.isRating = "ASC";
		$scope.currentPage = 1;
		$scope.isCategory = true;
		
		linkHotelServices.crudCategory({"action":"Get"}, $scope);
		$scope.isHotelLinkloading=true;
		
		$scope.$on('loadLinkHotelDetails',function(event, data){
			$scope.linkHotelDetails  = data;
			$scope.totalItems =  $scope.linkHotelDetails.length;
			$scope.linkHotelDetailsPage = $scope.linkHotelDetails.slice(0, $scope.itemsPerPage);
			$scope.currentPage = 1;
			
			if(!$scope.linkHotelDetails[0]){
				$scope.isCategory = false;
			}else{
				$scope.isCategory = true;
			}
			//Release the loading 
			$scope.isHotelLinkloading=false;
		});
	
	
	
		$scope.$on('reloadLinkHotelDetails', function(event){
			linkHotelServices.crudCategory({"action":"Get"}, $scope);
			$scope.currentPage = 1;
			$scope.isHotelLinkloading=true;
		});
		
	
		$scope.sortByName = function(){
			//Toggle SORT Values
			($scope.isNameASC == "ASC")?$scope.isNameASC="DESC":$scope.isNameASC="ASC";
			linkHotelServices.crudCategory({'col':"hotel_name",'ORDER':$scope.isNameASC, 'action':'Order'},$scope);
		};
		
			$scope.sortByRating = function(){
			//Toggle SORT Values
			($scope.isRating == "ASC")?$scope.isRating="DESC":$scope.isRating="ASC";
			linkHotelServices.crudCategory({'col':"hotel_category",'ORDER':$scope.isRating, 'action':'Order'},$scope);
		};
	
	
		//Searching the values from search Textbox
		$scope.getChar = function($event){
			var selectedDetails;
			if($event.target.value != ""){
				selectedDetails = $filter('filter')($scope.linkHotelDetails, $event.target.value)
				$scope.totalItems =  selectedDetails.length;
				$scope.linkHotelDetailsPage = selectedDetails.slice(0, $scope.itemsPerPage);
			}else{				
				$scope.totalItems =  $scope.linkHotelDetails.length;
				$scope.linkHotelDetailsPage = $scope.linkHotelDetails.slice(0, $scope.itemsPerPage);
			}
			$scope.currentPage = 1;
		};
	
	
		$scope.pageChanged = function(currentPage){
			var start = (currentPage-1) * $scope.itemsPerPage;
			var end = start + $scope.itemsPerPage;
			$scope.linkHotelDetailsPage = $scope.linkHotelDetails.slice(start,end);
		};
		
	
	
		$scope.editHotelItem = function (id){
			var selectedDetails = $filter('getById')($scope.linkHotelDetails, id);
			var editInstance = $modal.open({
			templateUrl: 'linkHotelContent.html',
			controller: popupLinkHotelControllerIns,
			resolve: {
				headerName: function () {
					return "Edit Tour Hotels";
				},
				selectedDetails:function(){
					return selectedDetails;
				},	
				totalDetails:function(){
					return $scope.linkHotelDetails;
				} 
				}
		});


	
		editInstance.result.then(function (userItems) {
			  linkHotelServices.crudCategory(userItems, $scope);
		});
		
	};
	
	
	$scope.openWindow = function () {

		var modalInstance = $modal.open({
		  templateUrl: 'linkHotelContent.html',
		  controller: popupLinkHotelControllerIns,
		  resolve: {
			headerName: function () {
			  return "Add Tour Hotels";
				},
			  selectedDetails: function(){
				return "";
			  },totalDetails:function(){
					return $scope.linkHotelDetails;
				} 
			  }
		});
		
		
		 modalInstance.result.then(function (userItems) {
			  linkHotelServices.crudCategory(userItems, $scope);
		});
	   };

	$scope.deleteItem = function (id){
			//Confirm if any product is there 
			if (confirm('Are you sure you want to delete?')) {
				linkHotelServices.crudCategory({'id':id, 'action' : 'Delete'},$scope);
			}
	};



});





var popupLinkHotelControllerIns = function ($scope, $filter, $modalInstance, headerName, selectedDetails, totalDetails) {
  $scope.headerName = headerName;
  $scope.hotelLink = {};

  
  var insertDate = new Date();
  
  if(selectedDetails != ""){
	  $scope.hotelLink.hotel_name = selectedDetails.hotel_name;
	  $scope.hotelLink.hotel_address= selectedDetails.hotel_address;
	  $scope.hotelLink.hotel_category= selectedDetails.hotel_category;
	  $scope.hotelLink.id = selectedDetails.id;
	  $scope.hotelLink.MODIFIED_DATE = insertDate.toJSON(); 
	  $scope.hotelLink.action = "Edit";
  }else{   
  	  $scope.hotelLink.action = "Insert";
	  $scope.hotelLink.INSERT_DATE = insertDate.toJSON();
  }
  
   $scope.getChar = function($event){
		 var selectedDetails;
		if($event.target.value != ""){
			selectedDetails = $filter('searchObjectItem')(totalDetails, $event.target.value, 'hotel_name')
			if(selectedDetails.length > 0){
				$scope.data.isExist = true;
			}else{
				$scope.data.isExist = false;
			}
		}else{
				$scope.data.isExist = false;
		}
   }

  
  $scope.saveChanges = function () {
	$modalInstance.close($scope.hotelLink);
  };

	
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};





