// JavaScript Document
app.controller("hotelFeaturedController", ['$scope', 'sharedEventDispatcher', '$filter', 'hotelServices', '$interval', '$location', 'catServices'
, function($scope, sharedEventDispatcher, $filter, hotelServices, $interval, $location,  catServices){


	$scope.hotelform = {};
	
	$scope.totalPackages = sharedEventDispatcher.totalHotels;  
	$scope.hotelform.info = "";
	$scope.hotelform.infoDisplay = false;
	$scope.hotelform.packages_name = "";
	
	
	//pack Details
	$scope.itemsPerPage = 5;
	$scope.isNameASC = "ASC";
	$scope.isRatingASC = "ASC";
	$scope.currentPage = 1;
	$scope.restPack = ""
	$scope.featPack = ""
	$scope.isNotLinked = false;
	$scope.currentId = ""
	$scope.currentpackIds = "";
	

	
	$scope.restAlltoFalse = function(){
		for(var i=0;i<$scope.restPack.length;i++){
			$scope.restPack[i]["islinked"] = false;
		}
	}
	
	

	$scope.setData = function(totalPackages){
		$scope.packages  = totalPackages;
		$scope.featPack =  $filter("filterOnCondition")($scope.packages, 'isFeatured', "1");
		$scope.restPack = $filter("filterOnCondition")($scope.packages, 'isFeatured', "0");
		$scope.totalItems =  $scope.restPack.length;
		$scope.packDetailsPage = $scope.restPack.slice(0, $scope.itemsPerPage);
		$scope.currentPage = 1;
		$scope.isNotLinked = true;
		$scope.isloading=false;
		
		if($scope.featPack.length){
			$scope.isNotLinked = false;
		}
		
		$scope.restAlltoFalse();
	}
	
	if($scope.totalPackages.length == 0){
		hotelServices.getHotels($scope);
		$scope.isloading=true;
	}else{
		$scope.setData($scope.totalPackages);		
	}
	
	$scope.$on('loadDetails',function(event, data){
		if(data[0].data != ""){
			$scope.setData(data[0].data);	
		}				
	});	
	
	
	$scope.$on('reloadPackDetails', function(event){
		hotelServices.getHotels($scope);
		$scope.currentPage = 1;
		$scope.isloading=true;
	});
	
	

	$scope.sortByName = function(){
		//Toggle SORT Values
		($scope.isNameASC == "ASC")?$scope.isNameASC="DESC":$scope.isNameASC="ASC";
		hotelServices.getHotelsByOrder({'col':"hotel_name",'ORDER':$scope.isNameASC},$scope);
	};
	
	$scope.sortByCost = function(){
		($scope.isCostASC == "ASC")?$scope.isCostASC="DESC":$scope.isCostASC="ASC";
		hotelServices.getHotelsByOrder({'col':"hotel_cost",'ORDER':$scope.isCostASC},$scope);
	};

	
	$scope.getChar = function($event){
		var selectedDetails;
		if($event.target.value != ""){
			selectedDetails = $filter('filter')($scope.packages, $event.target.value)
			$scope.totalItems =  selectedDetails.length;
			$scope.packDetailsPage = selectedDetails.slice(0, $scope.itemsPerPage);
		}else{				
			$scope.totalItems =  $scope.packages.length;
			$scope.packDetailsPage = $scope.packages.slice(0, $scope.itemsPerPage);
		}
		$scope.currentPage = 1;
	};
	
	$scope.pageChanged = function(currentPage){
		var start = (currentPage-1) * $scope.itemsPerPage;
		var end = start + $scope.itemsPerPage;
		$scope.packDetailsPage = $scope.restPack.slice(start,end);
	};
	

	
	
	
	
	
	$scope.setFeatured = function(){
		var selectedId = [];
		var insertDate = new Date();
		
		
		
		for(var i=0; i < $scope.restPack.length;i++){
			if($scope.restPack[i].isFeatured != undefined && $scope.restPack[i].isFeatured != false){
				selectedId.push($scope.restPack[i].id);		
			}
		}

		if(!selectedId.length){
			alert("Select any item");
		}else{
			if($scope.featPack.length + selectedId.length > 4){
				alert("Only 4 items can be featured");
				return;
			}
			
			var selectedObj = new Object();
			selectedObj.isFeatured =  1;
			selectedObj.id = selectedId.toString();
			hotelServices.editfeatLinks($scope, selectedObj);
		}
	}
	
	
	//Delete the link
	$scope.deleteFeatured = function(pack_id){
		var getRestItems = [];
		var selectedObj = new Object();
		var insertDate = new Date();

		selectedObj.isFeatured =  0;
		selectedObj.id = pack_id;
		hotelServices.editfeatLinks($scope, selectedObj);
		 
	}
	
	
	//Event listener for pack links update
	$scope.$on("reloadPackFeatDetails",function($event){
		hotelServices.getHotels($scope);;
		$scope.isloading=true;
	});
	
	$scope.goToPackage = function(){
		$location.path("/hotels");
	}
}]);