// JavaScript Document
app.controller("newsTestimonial", function($scope, $filter, testServices, newsServices, packServices, sharedEventDispatcher, imageServices){ 

	$scope.newsDetails = [];
	$scope.testimonialDetails = [];
	$scope.featurePackDetails = [];
	$scope.packages = [];
	$scope.totalImagePackages = [];
	$scope.noImageFile = "no-image.jpg";
	
	//Call those two services
	testServices.crudCategory({"action":"Get"}, $scope);
	newsServices.crudCategory({"action":"Get"}, $scope);
	packServices.getPackages($scope);
	
	$scope.$on('loadtestDetails', function($event, data){
		$scope.testimonialDetails = data;
	});
	
	$scope.$on('loadnewsDetails', function($event, data){
		$scope.newsDetails = data;
	});
	
		
	$scope.$on('loadPackDetails', function($event, data){
		//store it in a session variable
		if(data[0].data != ""){
			$scope.packages  = data[0].data;			
			imageServices.getImgDetails($scope);			
		}else{
			$scope.isloading=false;
		}
	});
	
	
		//Get all the package Thumb Images
	$scope.$on("getImageDetails", function($event, data){
		$scope.totalImagePackages = data[0];

		for(var i=0;i< $scope.packages.length;i++){
			var dateObj = new Date();
			$scope.imageDetails = $filter("getByPackageId")($scope.totalImagePackages,$scope.packages[i].id);
			if($scope.imageDetails.length){
				$scope.packages[i].first_image = $scope.imageDetails[0].package_thumb_img;
			}else{
				$scope.packages[i].first_image =  $scope.noImageFile;
			}
			
			//Add Day items
			$scope.packages[i].dayString = (parseInt($scope.packages[i].package_duration) - 1) + "Nights / " + $scope.packages[i].package_duration + "Days";
			dateObj = new Date(String($scope.packages[i].package_valid_to).split(" ")[0]);
			 $scope.packages[i].offerValid = "Offer till " + $filter("date")(dateObj, 'MMM d, y');  
		}
		
		
		//Store it in global variable 
		sharedEventDispatcher.setTotalImagePackages($scope.totalImagePackages);
		sharedEventDispatcher.setPackages($scope.packages);
		$scope.featurePackDetails = $filter("searchObjectItem")($scope.packages, "1" , "isFeatured");
		$scope.isloading=false;
	});

	
});

