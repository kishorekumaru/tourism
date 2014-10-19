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

function animationEffect(parent, child, speed){
	if($(parent).size()) {
		$(child).hide();
	}
	var totalSize = $(parent).children().length;
	var index=0;
	$($(parent).children()[0]).fadeIn(speed);
	
	setInterval(function(){
		$($(parent).children()[index]).fadeOut(speed);
			index++;
			if(index > (totalSize - 1)){
				index = 0;
			}
		$($(parent).children()[index]).fadeIn(speed);
	}, 5000);
}

function setBanner(){
	animationEffect(".banner-container", ".banner-holder", 1000)
}

function clientSay(){
	animationEffect(".client-container", ".clientlist",500);
}

function newsUpdate(){
	animationEffect(".newsUpdate-container", ".newslist",500);
}

app.controller("mainViewController", function($scope, $filter, $location, testServices,
 newsServices, packServices, sharedEventDispatcher, imageServices, $interval, hotelServices){ 

	$scope.newsDetails = [];
	$scope.testimonialDetails = [];
	$scope.featurePackDetails = [];
	$scope.featureHotelDetails = [];
	$scope.packages = [];
	$scope.totalImagePackages = [];
	$scope.noImageFile = "no-image.jpg";
	$scope.totalCategories = [];
	$scope.bannerDetails = [];
	$scope.hotelPackages;
	
	
	//Call those two services
	testServices.crudCategory({'col':'INSERT_DATE','ORDER':'DESC', 'action':'Order'}, $scope);
	if(!$scope.newsDetails.length){
			 newsServices.crudCategory({'col':'INSERT_DATE','ORDER':'DESC', 'action':'Order'}, $scope);
	}
	packServices.getPackages($scope);
	hotelServices.getHotelPackages($scope);
	//call banner Images 
	imageServices.getBannerDetails($scope);
	
	$scope.$on('getBannerImageDetails', function($event, data){
		$scope.bannerDetails = data[0];
		$scope.setBannerInt = $interval(function(){
			if(angular.isDefined($scope.setBannerInt)){
				
				setSlider();
				 $interval.cancel($scope.setBannerInt);
				 $scope.setBannerInt = undefined;
			}
		},3000);
		
	});
	//Call Back Method for test details
	$scope.$on('loadtestDetails', function($event, data){
		$scope.testimonialDetails = data;
		sharedEventDispatcher.setTestimonials(data);
		$scope.setClientInt = $interval(function(){
			if(angular.isDefined($scope.setNewsInt)){
				 clientSay();
				 $interval.cancel($scope.setClientInt);
				 $scope.setClientInt = undefined;
			}
		},4000);
	});
	
	$scope.$on('loadnewsDetails', function($event, data){
		$scope.newsDetails = data;
		sharedEventDispatcher.setNewsDetails(data);	
		$scope.setNewsInt = $interval(function(){
			if(angular.isDefined($scope.setNewsInt)){
				 newsUpdate();
				 $interval.cancel($scope.setNewsInt);
				 $scope.setNewsInt = undefined;
			}
		},5000);
		
	});
	
	$scope.$on('loadHotelPackDetails', function($event, data){
			//store it in a session variable
			if(data[0].data != ""){
				$scope.hotelPackages  = data[0].data;			
				imageServices.getHotelImgDetails($scope);			
			}else{
				$scope.isloading=false;
			}
		});
		
		
	$scope.$on("getHotelImageDetails", function($event, data){
		$scope.totalHotelImagePackages = data[0];
		
		for(var i=0;i< $scope.hotelPackages.length;i++){
				var dateObj = new Date();
				$scope.imageDetails = $filter("searchObjectItem")($scope.totalHotelImagePackages,$scope.hotelPackages[i].id, 'hotel_id');
				if($scope.imageDetails.length){
					$scope.hotelPackages[i].first_image = $scope.imageDetails[0].hotel_thumb_img;
				}else{
					$scope.hotelPackages[i].first_image =  $scope.noImageFile;
				}
				
				//Add Day items
				$scope.hotelPackages[i].dayString = (parseInt($scope.hotelPackages[i].hotel_duration) - 1) 
												+ "Night(s) / " + $scope.hotelPackages[i].hotel_duration + "Day(s)";
				dateObj = new Date(String($scope.hotelPackages[i].package_valid_to).split(" ")[0]);
				$scope.hotelPackages[i].offerValid = "Offer till " + $filter("date")(dateObj, 'MMM d, y');  
			}
			
		$scope.isloading=false;
		$scope.selectedIndex = 0;
		$scope.totalHotelPackItems = $scope.hotelPackages;
		//Store it in global variable 					
		sharedEventDispatcher.setHotelTotalImagePackages($scope.totalHotelImagePackages);
		sharedEventDispatcher.setHotelPackages($scope.hotelPackages);
		$scope.featureHotelDetails = $filter("searchObjectItem")($scope.hotelPackages, "1" , "isFeatured");
		
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

