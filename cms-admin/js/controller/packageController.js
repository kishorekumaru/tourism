app.controller("packageController", function($scope, $rootScope, $modal, $location, $filter, packServices
, sharedEventDispatcher, imageServices, catServices, dayDetailServices){

	
	$scope.packages= [];
	$scope.packPage = [];
	$scope.itemsPerPage = 2;
	$scope.isNameASC = "ASC";
	$scope.isCostASC = "ASC";
	$scope.currentPage = 1;
	$scope.totalImagePackages = "";
	$scope.noImageFile = "no-image.jpg";
  
	packServices.getPackages($scope);
	catServices.crudCategory({"action":"Get"}, $scope);
	
	$scope.isloading=true;
	
	$scope.$on('loadCatDetails',function(event, data){
			$scope.totalCategories  = data;	
	});
	
	$scope.$on('loadPackDetails',function(event, data){
		if(data[0].data != ""){
			$scope.packages  = data[0].data;
			$scope.totalItems =  $scope.packages.length;
			$scope.packPage = $scope.packages.slice(0, $scope.itemsPerPage);
			$scope.currentPage = 1;
			
			//Store it in global variable 
			sharedEventDispatcher.totalPackagesObj($scope.packages);
			imageServices.getImgDetails($scope);
		}else{
			$scope.packPage.package_valid_from = new Date();
			$scope.packPage.pack.package_valid_to  = new Date();
			$scope.isloading=false;
		}
		
	});
	
	
	//Get all the package Thumb Images
	$scope.$on("getImageDetails", function($event, data){
		$scope.totalImagePackages = data[0];
		//Store it in global variable 
		sharedEventDispatcher.setTotalImagePackages($scope.totalImagePackages);
		for(var i=0;i< $scope.packages.length;i++){
			$scope.imageDetails = $filter("getByPackageId")($scope.totalImagePackages,$scope.packages[i].id);
			if($scope.imageDetails.length){
				$scope.packages[i].first_image = $scope.imageDetails[0].package_thumb_img;
			}else{
				$scope.packages[i].first_image =  $scope.noImageFile;
			}
		}
		$scope.isloading=false;
	});

	
	$scope.$on('reloadPackDetails', function(event){
		packServices.getPackages($scope);
		$scope.currentPage = 1;
		$scope.isloading=true;	
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
	
	
	
	//Select the items by category
	$scope.selectByCat = function($event){
		if($scope.cat_id != null){
			selectedDetails = $filter('searchObjectItem')($scope.packages, $scope.cat_id, 'cat_id')
			$scope.totalItems =  selectedDetails.length;
			$scope.packPage = selectedDetails.slice(0, $scope.itemsPerPage);
		}else{
			$scope.totalItems =  $scope.packages.length;
			$scope.packPage = $scope.packages.slice(0, $scope.itemsPerPage);
		}
		$scope.currentPage = 1;
	}
	
	$scope.pageChanged = function(currentPage){
		var start = (currentPage-1) * $scope.itemsPerPage;
		var end = start + $scope.itemsPerPage;
		$scope.packPage = $scope.packages.slice(start,end);
	};
	
	$scope.editPackItem = function (id){		
		var selectedDetails = $filter('getById')($scope.packages, id);
		sharedEventDispatcher.sharePackEditDetails(selectedDetails); 
		//$rootScope.$emit("editPackages",[selectedDetails]);
		$location.path("/addPackages");
	};
	
	$scope.linkHotels = function (id){		
		var selectedDetails = $filter('getById')($scope.packages, id);
		sharedEventDispatcher.sharePackageID(id, $scope.packages);
		$location.path("/linkHotels");
	};
	

	
	$scope.deletePackage = function (id){
		if (confirm('Are you sure you want to delete?')) {
    		//Delete all the package Information before Deleting
			packItems = $filter("searchObjectItem")($scope.totalImagePackages,id,'package_id');
			try{
				for(var i=0;i<packItems.length;i++){
					var sendObj = new Object();
					sendObj.big_img = packItems[i].package_big_img;
					sendObj.small_img = packItems[i].package_small_img;
					sendObj.thumb_img = packItems[i].package_thumb_img;
					imageServices.unlinkImages($scope, sendObj, packItems[i].id);
					imageServices.deleteImgDetails({'id':packItems[i].id}, $scope); 				 
				}
				dayDetailServices.getDayDetails(id, $scope);  
				
			}catch(err){
				alert(err.message);
			}
		} 
	};
	
	$scope.$on('getDayDetails', function($event, data){
	   	var getSelectedPack = [];
		getSelectedPack =  $filter('getByPackageId')(data[0], data[1]);
		for(i=0;i<getSelectedPack.length;i++){	
			dayDetailServices.deleteDetails({'id':getSelectedPack[i].id}, $scope);
		}
		packServices.deletePack({'id':data[1]},$scope);
	});
	
	
	$scope.manageDays = function (id){
		sharedEventDispatcher.sharePackageID(id, $scope.packages);
		$location.path("/dayDetails");
	};

	
	$scope.manageImage = function(id){
		sharedEventDispatcher.sharePackageID(id, $scope.packages);
		$location.path("/packImages");
	};



	//Opeing the package in detailed View
	$scope.showViewPanel = function (id){
			sharedEventDispatcher.sharePackageID(id, $scope.packages);
			$location.path("/viewPackages");
	}

	$scope.addPackage = function(){
		$location.path("/addPackages");
	}
	
	
	
	
 
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