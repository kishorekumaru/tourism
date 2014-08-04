// JavaScript Document
app.controller("viewPackagesController",  
	function($scope, sharedEventDispatcher, $filter, $location, dayDetailServices, hotelServices, hotelLinkServices){
	
	$scope.status = {};
	
	//Declare the local variables
	$scope.status.open1 = true;
	$scope.status.open2 = true;
	$scope.currentTab = 1;
	$scope.selectedPackage = {};
	$scope.selectedImage = {};
	$scope.slides = [];
	$scope.hotelLinkDetails = [];
	$scope.linkedHotels = [];
	$scope.isNotLinked = false;
	
	$scope.addSlide = function(imgName) {
			$scope.slides.push({image: 'com/uploads/' + imgName});
	 };
	
	$scope.makeTabVisible = function(selectedTab){
		if($scope.currentTab !== selectedTab){
			$scope.status["open" + $scope.currentTab] = false;
			$scope.status["open" + selectedTab] = true;
			$scope.currentTab = selectedTab; 
		}
	};
	
	//Get package Information
	if(sharedEventDispatcher.packageId !== undefined || sharedEventDispatcher.packageId !== "" ){ 
		$scope.selectedPackage = $filter("getById")(sharedEventDispatcher.totalPackages, sharedEventDispatcher.packageId); 
		$scope.selectedImage  = $filter("getByPackageId")(sharedEventDispatcher.getTotalImagePackages(), sharedEventDispatcher.packageId); 
		
		if($scope.selectedImage.length){
			//Loop the Image to 
			for(var i=0;i<$scope.selectedImage.length;i++){
					$scope.addSlide($scope.selectedImage[i].package_small_img);
			}
			
		}
	}else{
		alert('Problem occured');
	}
	
	
	//Get all Images
		
	
	//Get all Package Day Information
	if(sharedEventDispatcher.packageId !== undefined || sharedEventDispatcher.packageId !== "" ){
		dayDetailServices.getDayDetails(sharedEventDispatcher.packageId, $scope);   
	}	
	
	$scope.$on('getDayDetails', function($event, data){
	    $scope.getSelectedPack = [];
		$scope.getSelectedPack =  $filter('getByPackageId')(data[0], sharedEventDispatcher.packageId);
		for(i=0;i<$scope.getSelectedPack.length;i++){
			$scope.getSelectedPack[i].day_num = i + 1;
		}
		
	});
	
	//Get all linked Hotel information
	
	hotelServices.getHotels($scope);
	$scope.isloading=true;
	
	
	$scope.$on('loadDetails',function(event, data){
		$scope.hotelDetails  = data[0].data;
		if(sharedEventDispatcher.packageId !== undefined || sharedEventDispatcher.packageId !== "" ){
			hotelLinkServices.getLinkDetails($scope,{'package_id':sharedEventDispatcher.packageId});	
		}
	});

	
	
	$scope.$on('loadHotelLinks',function(event, data){
		if(data[0].data[0] == ""){
			alert("Please create some hotels as well.");
			$scope.isNotLinked = true;
			$scope.linkedHotels =  [];
			
		}else if(data[0].data[0].hotel_id != ""){
			$scope.isNotLinked = false;
		    $scope.hotelLinkDetails  = data[0].data[0].hotel_id;
			$scope.linkedHotels =  $filter("filterLinkedHotels")($scope.hotelDetails, $scope.hotelLinkDetails);
		}else{
			$scope.isNotLinked = true;
			$scope.linkedHotels =  [];
		}
	});
	
	//General Call back
		$scope.goToPackage = function(){
		$location.path("/packages");
	}
});