/**
 * @author Kishore Kumar Unnikrishnan
 * Created Date - 05-05-2014 
 
-- Client : Glacier Holidays--
Version : 1.0
Updated on 20 July 2014 

-- About
	
The file contains Controllers and function to retrive informations
	
-- Updates 

Included Services for News and Testimonial Services

*/


app.controller("mainViewController", function($scope, $filter, $location, testServices,
 newsServices, packServices, sharedEventDispatcher, imageServices){ 

	$scope.newsDetails = [];
	$scope.testimonialDetails = [];
	$scope.featurePackDetails = [];
	$scope.packages = [];
	$scope.totalImagePackages = [];
	$scope.noImageFile = "no-image.jpg";
	$scope.totalCategories = [];
	
	
	
	//Call those two services
	testServices.crudCategory({'col':'INSERT_DATE','ORDER':'DESC', 'action':'Order'}, $scope);
	newsServices.crudCategory({'col':'INSERT_DATE','ORDER':'DESC', 'action':'Order'}, $scope);
	packServices.getPackages($scope);
	
	//Call Back Method for test details
	$scope.$on('loadtestDetails', function($event, data){
		$scope.testimonialDetails.push(data[0]);
		sharedEventDispatcher.setTestimonials(data);	
	});
	
	
	//Call Back Method for News details
	$scope.$on('loadnewsDetails', function($event, data){
		$scope.newsDetails.push(data[0]);
		sharedEventDispatcher.setNewsDetails(data);
	});
	
	
	//Call Back Method for Package details	
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
			$scope.packages[i].dayString = (parseInt($scope.packages[i].package_duration) - 1) + "Night(s) / " + $scope.packages[i].package_duration + "Day(s)";
			dateObj = new Date(String($scope.packages[i].package_valid_to).split(" ")[0]);
			 $scope.packages[i].offerValid = "Offer till " + $filter("date")(dateObj, 'MMM d, y');  
		}
		
		
		//Store it in global variable 
		sharedEventDispatcher.setTotalImagePackages($scope.totalImagePackages);
		sharedEventDispatcher.setPackages($scope.packages);
		$scope.featurePackDetails = $filter("searchObjectItem")($scope.packages, "1" , "isFeatured");
		packServices.crudCategory({"action":"Get"}, $scope);
		
	});

	$scope.$on('loadCatDetails',function(event, data){
			$scope.totalCategories  = data;
			var addAllObj = new Object();
			addAllObj.cat_name = "ALL"
			addAllObj.id = 0;
			$scope.totalCategories.push(addAllObj)
			sharedEventDispatcher.setCateogry($scope.totalCategories);
			$scope.isloading=false;
	});
	


		$scope.openPackView = function(id, pack_url){
			sharedEventDispatcher.setPackageID(id);
			$location.path("/tour_packages/" + pack_url);
		}
	
	$scope.gotoURL = function(returnURL){
		$location.path(returnURL);
	}
	
});

