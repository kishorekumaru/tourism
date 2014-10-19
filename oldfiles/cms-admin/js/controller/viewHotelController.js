// JavaScript Document
app.controller("viewHotelController",  
	function($scope, sharedEventDispatcher, $filter, $location, dayDetailServices,  hotelLinkServices,linkHotelServices){
	
	$scope.status = {};
	
	//Declare the local variables
	$scope.status.open1 = true;
	$scope.status.open2 = true;
	$scope.currentTab = 1;
	$scope.selectedPackage = {};
	$scope.selectedImage = {};
	$scope.slides = [];
	$scope.isNotLinked = false;
	
	$scope.addSlide = function(imgName, description) {
			$scope.slides.push({image: 'com/uploads/' + imgName, description: description});
	 };
	
	$scope.makeTabVisible = function(selectedTab){
		if($scope.currentTab !== selectedTab){
			$scope.status["open" + $scope.currentTab] = false;
			$scope.status["open" + selectedTab] = true;
			$scope.currentTab = selectedTab; 
		}
	};
	
	//Get package Information
	if(sharedEventDispatcher.hotelId !== undefined || sharedEventDispatcher.hotelId !== "" ){ 
		$scope.selectedPackage = $filter("getById")(sharedEventDispatcher.getTotalHotelsObj(), sharedEventDispatcher.hotelId); 
		$scope.selectedImage  = $filter("searchObjectItem")(sharedEventDispatcher.getTotalHotelImagePackages(), sharedEventDispatcher.hotelId, 'hotel_id'); 
		
		if($scope.selectedImage.length){
			//Loop the Image to 
			for(var i=0;i<$scope.selectedImage.length;i++){
					$scope.addSlide($scope.selectedImage[i].hotel_small_img, $scope.selectedImage[i].description);
			}
			
		}
	}else{
		alert('Problem occured');
	}
	

	
	
	//General Call back
		$scope.goToPackage = function(){
		$location.path("/hotels");
	}
});// JavaScript Document