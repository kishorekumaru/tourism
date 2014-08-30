// JavaScript Document
app.controller("linkHotelController", ['$scope', 'sharedEventDispatcher', '$filter', 'dayDetailServices','packServices', '$interval', '$location', 'linkHotelServices', 'hotelLinkServices'
, function($scope, sharedEventDispatcher, $filter, dayDetailServices, packServices, $interval, $location, linkHotelServices, hotelLinkServices){


	$scope.packform = {};
	$scope.packageId = sharedEventDispatcher.packageId;
	$scope.totalPackages = sharedEventDispatcher.totalPackages;  
	$scope.packform.info = "";
	$scope.packform.infoDisplay = false;
	$scope.packform.packages_name = "";
	
	
	//Hotel Details
	$scope.hotelDetails = "";
	$scope.itemsPerPage = 5;
	$scope.isNameASC = "ASC";
	$scope.isRatingASC = "ASC";
	$scope.currentPage = 1;
	$scope.restHotels = ""
	$scope.linkedHotels = ""
	$scope.isNotLinked = false;
	$scope.currentId = ""
	$scope.currentHotelIds = "";

	//Hotel Link Details
	$scope.hotelLinkDetails = "";

	if($scope.packageId != 0){
		$scope.packform.packages_name = $scope.packageId;
	}
	linkHotelServices.crudCategory({"action":"Get"}, $scope);
	$scope.isloading=true;
	
	
	$scope.$on('loadLinkHotelDetails',function(event, data){
		$scope.hotelDetails  = data;
		if($scope.packform.packages_name == ""){	
			if(!$scope.totalPackages[0]){		
				alert("No Package found, Please create a new package");
				$location.path("/packages");
			}else{
				hotelLinkServices.getLinkDetails($scope,{'package_id':$scope.totalPackages[0].id});	
			}
		}else{
			hotelLinkServices.getLinkDetails($scope,{'package_id':$scope.packform.packages_name});		
		}
	});
	
	$scope.$on('loadHotelLinks',function(event, data){
		if(data[0].data[0] == ""){
			alert("Problem presist with the package, Please delete the pack and create again.");
			return;
		}
		if(data[0].data[0].link_hotel_id == ""){
			$scope.isNotLinked = true;
			$scope.restHotels = $scope.hotelDetails;
			$scope.linkedHotels =  [];
		}else{
			$scope.isNotLinked = false;
		    $scope.hotelLinkDetails  = data[0].data[0].link_hotel_id;
			$scope.linkedHotels =  $filter("filterLinkedHotels")($scope.hotelDetails, $scope.hotelLinkDetails);
			$scope.restHotels = $filter("filterRestHotels")($scope.hotelDetails, $scope.hotelLinkDetails);
		}
		$scope.currentId  = data[0].data[0].id;
		if(data[0].data[0].link_hotel_id != "") {
			$scope.currentHotelIds = data[0].data[0].link_hotel_id;
		}else{
			$scope.currentHotelIds = data[0].data[0].link_hotel_id;
		}
		$scope.restAlltoFalse();
		$scope.totalItems =  $scope.restHotels.length;
		$scope.hotelDetailsPage = $scope.restHotels.slice(0, $scope.itemsPerPage);
		$scope.currentPage = 1;
		$scope.isloading=false;
	});
	
	
	
	$scope.$on('reloadLinkHotelDetails', function(event){
		linkHotelServices.crudCategory({"action":"Get"}, $scope);
		$scope.currentPage = 1;
		$scope.isloading=true;
	});
	
	
	$scope.restAlltoFalse = function(){
		for(var i=0;i<$scope.restHotels.length;i++){
			$scope.restHotels[i]["islinked"] = false;
		}
	}
	
	$scope.sortByName = function(){
		//Toggle SORT Values
		($scope.isNameASC == "ASC")?$scope.isNameASC="DESC":$scope.isNameASC="ASC";
		linkHotelServices.crudCategory({'col':"hotel_name",'ORDER':$scope.isNameASC, 'action':'Order'},$scope);
	};
	
	$scope.sortByRating = function(){
		($scope.isRatingASC == "ASC")?$scope.isRatingASC="DESC":$scope.isRatingASC="ASC";
		linkHotelServices.crudCategory({'col':"hotel_category",'ORDER':$scope.isRatingASC, 'action':'Order'},$scope);
	};
	
	$scope.getChar = function($event){
		var selectedDetails;
		if($event.target.value != ""){
			selectedDetails = $filter('filter')($scope.hotelDetails, $event.target.value)
			$scope.totalItems =  selectedDetails.length;
			$scope.hotelDetailsPage = selectedDetails.slice(0, $scope.itemsPerPage);
		}else{				
			$scope.totalItems =  $scope.hotelDetails.length;
			$scope.hotelDetailsPage = $scope.hotelDetails.slice(0, $scope.itemsPerPage);
		}
		$scope.currentPage = 1;
	};
	
	$scope.pageChanged = function(currentPage){
		var start = (currentPage-1) * $scope.itemsPerPage;
		var end = start + $scope.itemsPerPage;
		$scope.hotelDetailsPage = $scope.restHotels.slice(start,end);
	};
	

	
	$scope.getPackValue = function(){
		if($scope.packform.packages_name == ""){
			hotelLinkServices.getLinkDetails($scope,{'package_id':$scope.totalPackages[0].id});		
		}else{
			hotelLinkServices.getLinkDetails($scope,{'package_id':$scope.packform.packages_name});		
		}
	}
	
	$scope.addLinkItem = function(){
		var selectedId = [];
		var insertDate = new Date();
		for(var i=0; i < $scope.restHotels.length;i++){
			if($scope.restHotels[i].islinked != undefined && $scope.restHotels[i].islinked != false){
				selectedId.push($scope.restHotels[i].id);
			}
		}
		if(!selectedId.length){
			alert("Select any item");
		}else{
			var selectedObj = new Object();
			selectedObj.id = $scope.currentId;
			if($scope.packform.packages_name == ""){			
				selectedObj.package_id = $scope.totalPackages[0].id;		
			}else{
				selectedObj.package_id = $scope.packform.packages_name;
			}
			if($scope.currentHotelIds != ""){
				selectedObj.link_hotel_id =  $scope.currentHotelIds + ',' + selectedId.toString();
			}else{
				selectedObj.link_hotel_id = selectedId.toString();
			}
			selectedObj.MODIFIED_DATE = insertDate.toJSON();
			hotelLinkServices.editHotelLinks($scope, selectedObj);
		}
	}
	
	
	//Delete the link
	$scope.deleteLink = function(link_hotel_id){
		var getRestItems = [];
		var currentIds = $scope.currentHotelIds.split(",");
		var selectedObj = new Object();
		var insertDate = new Date();

		getRestItems = $filter("filterRestIds")(currentIds, link_hotel_id);
		selectedObj.id = $scope.currentId;
		if($scope.packform.packages_name == ""){			
			selectedObj.package_id = $scope.totalPackages[0].id;		
		}else{
			selectedObj.package_id = $scope.packform.packages_name;
		}
		selectedObj.link_hotel_id = getRestItems.toString();
		selectedObj.MODIFIED_DATE = insertDate.toJSON();
		hotelLinkServices.editHotelLinks($scope, selectedObj);	 
	}
	
	
	//Event listener for Hotel links update
	$scope.$on("reloadHotelLinkDetails",function($event){
		if($scope.packform.packages_name == ""){
			hotelLinkServices.getLinkDetails($scope,{'package_id':$scope.totalPackages[0].id});		
		}else{
			hotelLinkServices.getLinkDetails($scope,{'package_id':$scope.packform.packages_name});		
		}
	});
	
	$scope.goToPackage = function(){
		$location.path("/packages");
	}
}]);