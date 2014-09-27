/**
 * @author Kishore Kumar Unnikrishnan
 * Created Date - 05-05-2014 
 
-- Client : Glacier Holidays--
Version : 1.0
Updated on 10 July 2014 

-- About
	
packageList and packViewController
	

*/

app.controller("packageList", function($scope, $filter, $location, 
testServices, newsServices, packServices, sharedEventDispatcher, imageServices){ 
		
		$scope.allPackageCat = [];
		$scope.totalImagePackages = [];
		$scope.noImageFile = "no-image.jpg";	
		$scope.packages =[];
		$scope.isloading=true;
		$scope.totalCategories = [];
		$scope.headerName = "TOUR PACKAGES"
		
		//Generate the view for Details
		$scope.generateView = function(){
			
			for(var i=0;i< $scope.packages.length;i++){
				var dateObj = new Date();
				$scope.imageDetails = $filter("getByPackageId")($scope.totalImagePackages,$scope.packages[i].id);
				if($scope.imageDetails.length){
					$scope.packages[i].first_image = $scope.imageDetails[0].package_thumb_img;
				}else{
					$scope.packages[i].first_image =  $scope.noImageFile;
				}
				
				//Add Day items
				$scope.packages[i].dayString = (parseInt($scope.packages[i].package_duration) - 1) 
												+ "Night(s) / " + $scope.packages[i].package_duration + "Day(s)";
				dateObj = new Date(String($scope.packages[i].package_valid_to).split(" ")[0]);
				$scope.packages[i].offerValid = "Offer till " + $filter("date")(dateObj, 'MMM d, y');  
			}
				
				

			$scope.totalCategories = $filter('orderBy')($scope.totalCategories, 'id')
			$scope.isloading=false;
			$scope.selectedIndex = 0;
			$scope.totalPackItems = $scope.packages;
		}
		
		
		
		
		if(!sharedEventDispatcher.getPackages().length){
				packServices.getPackages($scope)
		}else{
			$scope.packages=sharedEventDispatcher.getPackages();
			$scope.totalImagePackages = sharedEventDispatcher.getTotalImagePackages();
			$scope.totalCategories = sharedEventDispatcher.getCateogry();
			if(!$scope.totalCategories.length){
				packServices.crudCategory({"action":"Get"}, $scope);
			}else{				
				$scope.generateView();
				$scope.isloading=false;
			}
		}
			
		$scope.$on('loadPackDetails', function($event, data){
			//store it in a session variable
			if(data[0].data != ""){
				$scope.packages  = data[0].data;			
				imageServices.getImgDetails($scope);			
			}else{
				$scope.isloading=false;
			}
		});
		
		
			$scope.$on("getImageDetails", function($event, data){
				$scope.totalImagePackages = data[0];
					//Store it in global variable 
					
				sharedEventDispatcher.setTotalImagePackages($scope.totalImagePackages);
				sharedEventDispatcher.setPackages($scope.packages);
				
				packServices.crudCategory({"action":"Get"}, $scope);
				
	});
	
	$scope.$on('loadCatDetails',function(event, data){
			$scope.totalCategories  = data;
			var addAllObj = new Object();
			addAllObj.cat_name = "ALL"
			addAllObj.id = 0;
			
			$scope.totalCategories.push(addAllObj);	
			sharedEventDispatcher.setCateogry($scope.totalCategories);
			$scope.generateView();		
	});
	
	
	
	
	$scope.openPackView = function(id, pack_url){
	
		sharedEventDispatcher.setPackageID(id);
		$location.path("/tour_packages/" + pack_url);
	}
	
	$scope.filterCat = function(id, $index){
		
		$scope.selectedIndex = $index;
		
		if(id != 0){
			selectedDetails = $filter('searchObjectItem')($scope.packages, id, 'cat_id')
			$scope.totalPackItems = selectedDetails			
		}else{
			$scope.totalPackItems =  $scope.packages;;
			
		}
	}

});




app.controller("packViewController", function($scope, $route, $filter, $location, $routeParams,
	testServices, newsServices, packServices, sharedEventDispatcher, imageServices, $modal, contactServices){ 
	
	
	 $scope.totalPackages = sharedEventDispatcher.getPackages();
	 $scope.selectedID = sharedEventDispatcher.getPackageID();
	 $scope.totalImages = sharedEventDispatcher.getTotalImagePackages();
	 $scope.totalCateogry = sharedEventDispatcher.getCateogry();
	 $scope.slides = [];
	 $scope.selectedPackage = {};
	 $scope.selectedDayPack = [];
	 $scope.linkedHotels = [];
	 $scope.hotelDetails = [];
	 $scope.getSameCatPack = [];
	 $scope.sameCatPack = [];
	 $scope.selectedPackage.cat_id ="";
	 
	 
	 
	 $scope.addSlide = function(imgName, big_image, desc) {
			$scope.slides.push({image: 'cms-admin/com/uploads/' + imgName, big_image:'cms-admin/com/uploads/'+big_image, desc:desc});
	 };
	 
	 //Get Revelant Package ID 
	$scope.setOtherDetails = function(){
		
		$scope.selectedPackage = $filter("searchObjectItem")($scope.totalPackages, clickedURL, "package_url")[0];
		$scope.categoryObj = $filter("getById")($scope.totalCateogry, $scope.selectedPackage.cat_id);
		$scope.selectedImg = $filter("getByPackageId")($scope.totalImages, $scope.selectedPackage.id);
		$scope.selectedID = $scope.selectedPackage.id;
		$scope.selectedPackage.cat_name = $scope.categoryObj.cat_name;
		$scope.headerName =   $scope.categoryObj.cat_name ;
		
		packServices.getDayDetails($scope.selectedID, $scope);    
		packServices.getHotels($scope);
		$scope.getSameCatPack = $filter('searchObjectItem')($scope.totalPackages, $scope.selectedPackage.cat_id, 'cat_id')
		
		for(var i=0;i<$scope.getSameCatPack.length;i++){
			if($scope.getSameCatPack[i].id != $scope.selectedID){
				$scope.sameCatPack.push($scope.getSameCatPack[i]);
			}
			if(i==4){
				break;
			}
		}
	
	
		 if($scope.selectedImg.length){
				//Loop the Image to 
				for(var i=0;i<$scope.selectedImg.length;i++){
					$scope.addSlide($scope.selectedImg[i].package_small_img, $scope.selectedImg[i].package_big_img, $scope.selectedImg[i].description);
				}
		}
	}
	
	
	 //Get the location Package
	var clickedURL = "";
	angular.forEach($routeParams, function(key, value) {
		if(value == "packname"){
			clickedURL = key;
		}
	});
	
	
	
	
	if($scope.totalPackages.length) {
		$scope.setOtherDetails();	
	}else {
		packServices.getPackages($scope);
		
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
			 $scope.totalPackages = sharedEventDispatcher.getPackages();
	 		$scope.selectedID = sharedEventDispatcher.getPackageID();
	 		$scope.totalImages = sharedEventDispatcher.getTotalImagePackages();
	 		$scope.totalCateogry = sharedEventDispatcher.getCateogry();
			$scope.setOtherDetails();
			
		});
	}
	
	/**
	if($scope.selectedID == "" || $scope.selectedID == undefined){
		$location.path("/");
		return;
	} **/
	 
	// $scope.selectedPackage = $filter("getById")($scope.totalPackages, $scope.selectedID);
	
	
	
	//Open other pack
	$scope.packView = function(id){
		sharedEventDispatcher.setPackageID(id);
		$route.reload();
	}
	
	
	
	//Get all the hotels
	$scope.$on('loadDetails',function(event, data){
		$scope.hotelDetails  = data[0].data;
		packServices.getLinkDetails($scope,{'package_id':$scope.selectedID});
	 	
	});
	 
	 

	//Get all the days Information
	 $scope.$on('getDayDetails', function($event, data){
		$scope.selectedDayPack = [];
		$scope.selectedDayPack =  $filter('getByPackageId')(data[0], $scope.selectedID);
		for(i=0;i<$scope.selectedDayPack.length;i++){
			$scope.selectedDayPack[i].day_num = i + 1;
		}
		
	});
	
	
	//Get all Hotel Link Details
	$scope.$on('loadHotelLinks',function(event, data){
		if(data[0].data[0].hotel_id != ""){
			$scope.isNotLinked = false;
		    $scope.hotelLinkDetails  = data[0].data[0].hotel_id;
			$scope.linkedHotels =  $filter("filterLinkedHotels")($scope.hotelDetails, $scope.hotelLinkDetails);
		}else{
			$scope.isNotLinked = true;
			$scope.linkedHotels =  [];
		}
	});
	
	
	
	 
		
		
	$scope.gotoURL = function(returnURL){
		$location.path(returnURL);
	}
	

	$scope.inquireNow = function(){
		var InquireInstance = $modal.open({
			templateUrl: 'InquireTemplate.html',
			controller: largeInquirePopupUpIns,
			resolve: {
				totalDetails: function () {
					return $scope.selectedPackage;
				}
			}
		});
		
		InquireInstance.result.then(function (userItems) {
		  contactServices.crudCategory(userItems, $scope);
		});
 
	}


	$scope.$on("reloadContactDetails", function(){
		alert("Thanks for contacting us, Our executive will be in touch with you shortly");
	});

	//Open Modal Window for Larger Image
	$scope.openWindow = function(currentImage){
		var modalInstance = $modal.open({
			templateUrl: 'ImageTemplate.html',
			controller: largeImgPopupUpIns,
			resolve: {
				totalDetails: function () {
					return [$scope.selectedPackage.package_name, currentImage, $scope.slides];
				}
			}
		});
	
	}




});


var largeImgPopupUpIns = function ($scope, $modalInstance, totalDetails) {
  $scope.currentImage = totalDetails[1];
  $scope.headerName = totalDetails[0];
  $scope.slides  = totalDetails[2];
 
 	
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};



var largeInquirePopupUpIns = function ($scope, $modalInstance, totalDetails) {
  $scope.package = totalDetails;
  $scope.contactDetails = {};
  var insertDate = new Date();
 
  $scope.saveChanges = function () {
	 
		$scope.contactDetails.insert_date = insertDate.toJSON();
		$scope.contactDetails.contact_subject = $scope.package.package_name;
		$scope.contactDetails.action = "Insert";
		$modalInstance.close($scope.contactDetails);
	 
  };
  
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};




