// JavaScript Document

app.controller("catController", function($scope, $modal, $filter,  $location, sharedEventDispatcher,  catServices){
	
		$scope.catDetails = "";
		$scope.itemsPerPage = 10;
		$scope.isNameASC = "ASC";
		$scope.currentPage = 1;
	
		catServices.crudCategory({"action":"Get"}, $scope);
		$scope.isCatloading=true;
		
		$scope.$on('loadCatDetails',function(event, data){
			$scope.catDetails  = data;
			$scope.totalItems =  $scope.catDetails.length;
			$scope.catDetailsPage = $scope.catDetails.slice(0, $scope.itemsPerPage);
			$scope.currentPage = 1;
			
			//Release the loading 
			$scope.isCatloading=false;
		});
	
	
	
		$scope.$on('reloadCatDetails', function(event){
			catServices.crudCategory({"action":"Get"}, $scope);
			$scope.currentPage = 1;
			$scope.isCatloading=true;
		});
		
	
		$scope.sortByName = function(){
			//Toggle SORT Values
			($scope.isNameASC == "ASC")?$scope.isNameASC="DESC":$scope.isNameASC="ASC";
			catServices.crudCategory({'col':"cat_name",'ORDER':$scope.isNameASC, 'action':'Order'},$scope);
		};
	
	
		//Searching the values from search Textbox
		$scope.getChar = function($event){
			var selectedDetails;
			if($event.target.value != ""){
				selectedDetails = $filter('filter')($scope.catDetails, $event.target.value)
				$scope.totalItems =  selectedDetails.length;
				$scope.catDetailsPage = selectedDetails.slice(0, $scope.itemsPerPage);
			}else{				
				$scope.totalItems =  $scope.catDetails.length;
				$scope.catDetailsPage = $scope.catDetails.slice(0, $scope.itemsPerPage);
			}
			$scope.currentPage = 1;
		};
	
	
		$scope.pageChanged = function(currentPage){
			var start = (currentPage-1) * $scope.itemsPerPage;
			var end = start + $scope.itemsPerPage;
			$scope.catDetailsPage = $scope.catDetails.slice(start,end);
		};
		
	
	
		$scope.editHotelItem = function (id){
			var selectedDetails = $filter('getById')($scope.catDetails, id);
			var editInstance = $modal.open({
			templateUrl: 'catContent.html',
			controller: popupCatControllerIns,
			resolve: {
				headerName: function () {
					return "Edit Category";
				},
				selectedDetails:function(){
					return selectedDetails;
				},	
				totalDetails:function(){
					return $scope.catDetails;
				} 
				}
		});


	
		editInstance.result.then(function (userItems) {
			  catServices.crudCategory(userItems, $scope);
		});
		
	};
	
	
	$scope.openWindow = function () {

		var modalInstance = $modal.open({
		  templateUrl: 'catContent.html',
		  controller: popupCatControllerIns,
		  resolve: {
			headerName: function () {
			  return "Add Category";
				},
			  selectedDetails: function(){
				return "";
			  },totalDetails:function(){
					return $scope.catDetails;
				} 
			  }
		});
		
		
		 modalInstance.result.then(function (userItems) {
			  catServices.crudCategory(userItems, $scope);
		});
	   };

	$scope.deleteItem = function (id){
		
			//Confirm if any product is there 
			$scope.totalPackages = sharedEventDispatcher.totalPackages;
			$catPacks = $filter("searchObjectItem")($scope.totalPackages,id, 'cat_id');
			
			if($catPacks.length){
				alert("Cannot delete the Cateogry.\n This cateogry contains more than one package. \n Please delete or reassign this cateogry package other cateogry");
			}else{
				if (confirm('Are you sure you want to delete?')) {
		 		catServices.crudCategory({'id':id, 'action' : 'Delete'},$scope);
			}
		  }
		
	};



});





var popupCatControllerIns = function ($scope, $filter, $modalInstance, headerName, selectedDetails, totalDetails) {
  $scope.headerName = headerName;
  $scope.cat = {};
  $scope.data = {};
  $scope.data.isExist = false;
  
  var insertDate = new Date();
  
  if(selectedDetails != ""){
	  $scope.cat.cat_name = selectedDetails.cat_name;
	  $scope.cat.id = selectedDetails.id;
	  $scope.cat.MODIFIED_DATE = insertDate.toJSON(); 
	  $scope.cat.action = "Edit";
  }else{   
  	  $scope.cat.action = "Insert";
	  $scope.cat.INSERT_DATE = insertDate.toJSON();
  }
  
   $scope.getChar = function($event){
		 var selectedDetails;
		if($event.target.value != ""){
			selectedDetails = $filter('searchObjectItem')(totalDetails, $event.target.value, 'cat_name')
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
	$modalInstance.close($scope.cat);
  };

	
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};





