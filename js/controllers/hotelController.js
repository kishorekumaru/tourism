/**
 * @author Kishore Kumar Unnikrishnan
 * Created Date - 05-05-2014 
 
-- Client : Glacier Holidays--
Version : 1.0
Updated on 30 August 2014 

-- About
	
HotelList and HotelViewController
	

*/

app.controller("hotelList", function($scope, $filter, $location, hotelServices, sharedEventDispatcher, imageServices){ 
		
		
		$scope.totalImagePackages = [];
		$scope.noImageFile = "no-image.jpg";	
		$scope.packages =[];
		$scope.isloading=true;
		$scope.headerName = "HOTEL PACKAGES"
		
		//Generate the view for Details
		$scope.generateView = function(){
			
			for(var i=0;i< $scope.packages.length;i++){
				var dateObj = new Date();
				$scope.imageDetails = $filter("searchObjectItem")($scope.totalImagePackages,$scope.packages[i].id, 'hotel_id');
				if($scope.imageDetails.length){
					$scope.packages[i].first_image = $scope.imageDetails[0].hotel_thumb_img;
				}else{
					$scope.packages[i].first_image =  $scope.noImageFile;
				}
				
				//Add Day items
				$scope.packages[i].dayString = (parseInt($scope.packages[i].hotel_duration) - 1) 
												+ "Night(s) / " + $scope.packages[i].hotel_duration + "Day(s)";
				dateObj = new Date(String($scope.packages[i].package_valid_to).split(" ")[0]);
				$scope.packages[i].offerValid = "Offer till " + $filter("date")(dateObj, 'MMM d, y');  
			}
				
			$scope.isloading=false;
			$scope.selectedIndex = 0;
			$scope.totalPackItems = $scope.packages;
		}
		
		if(!sharedEventDispatcher.getHotelPackages().length){
				hotelServices.getHotelPackages($scope);
		}else{
			$scope.packages=sharedEventDispatcher.getHotelPackages();
			$scope.totalImagePackages = sharedEventDispatcher.getHotelTotalImagePackages();
			$scope.generateView();
			$scope.isloading=false;			
		}
			
		$scope.$on('loadHotelPackDetails', function($event, data){
			//store it in a session variable
			if(data[0].data != ""){
				$scope.packages  = data[0].data;			
				imageServices.getHotelImgDetails($scope);			
			}else{
				$scope.isloading=false;
			}
		});
		
		
			$scope.$on("getHotelImageDetails", function($event, data){
				$scope.totalImagePackages = data[0];
					//Store it in global variable 
					
				sharedEventDispatcher.setHotelTotalImagePackages($scope.totalImagePackages);
				sharedEventDispatcher.setHotelPackages($scope.packages);
				
				$scope.generateView();		
				
	});
	
	
	
	
	
	
	$scope.openPackView = function(id){
	
		sharedEventDispatcher.setHotelPackageID(id);
		$location.path("/hotelview");
	}
	
	

});




	app.controller("hotelViewController", function($scope, $route, $filter, $location, testServices, newsServices, packServices, sharedEventDispatcher, imageServices, $modal, contactServices){ 
	
	
	 $scope.totalPackages = sharedEventDispatcher.getHotelPackages();
	 $scope.selectedID = sharedEventDispatcher.getHotelPackageID();
	 $scope.totalImages = sharedEventDispatcher.getHotelTotalImagePackages();
	
	 $scope.slides = [];
	 $scope.selectedPackage = {};
	 $scope.selectedDayPack = [];
	 $scope.linkedHotels = [];
	 $scope.hotelDetails = [];
	 $scope.getSameCatPack = [];
	 $scope.sameCatPack = [];
	 $scope.selectedPackage.cat_id ="";
	 
	if($scope.selectedID == "" || $scope.selectedID == undefined){
		$location.path("/");
		return;
	}
	 
	 $scope.selectedPackage = $filter("getById")($scope.totalPackages, $scope.selectedID);
	 
	 $scope.selectedImg = $filter("searchObjectItem")($scope.totalImages, $scope.selectedID, 'hotel_id');

	 $scope.headerName =   $scope.selectedPackage.hotel_name ;

	 
	
	
	//Open other pack
	$scope.packView = function(id){
		sharedEventDispatcher.setHotelPackageID(id);
		$route.reload();
	}


	 
	 

	
	

	
	
	
	 $scope.addSlide = function(imgName, big_image, desc) {
			$scope.slides.push({image: 'cms-admin/com/uploads/' + imgName, big_image:'cms-admin/com/uploads/'+big_image, desc:desc});
	 };
	 
	 if($scope.selectedImg.length){
			//Loop the Image to 
			for(var i=0;i<$scope.selectedImg.length;i++){
					$scope.addSlide($scope.selectedImg[i].hotel_small_img, $scope.selectedImg[i].hotel_big_img, $scope.selectedImg[i].description);
			}
			
	}
		
		
	$scope.gotoURL = function(returnURL){
		$location.path(returnURL);
	}
	

	$scope.inquireNow = function(){
		var InquireInstance = $modal.open({
			templateUrl: 'InquireHotelTemplate.html',
			controller: largeInquireHotelPopupUpIns,
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
			templateUrl: 'ImageHotelTemplate.html',
			controller: largeHotelImgPopupUpIns,
			resolve: {
				totalDetails: function () {
					return [$scope.selectedPackage.hotel_name, currentImage, $scope.slides];
				}
			}
		});
	
	}




});


var largeHotelImgPopupUpIns = function ($scope, $modalInstance, totalDetails) {
  $scope.currentImage = totalDetails[1];
  $scope.headerName = totalDetails[0];
  $scope.slides  = totalDetails[2];
 
 	
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};



var largeInquireHotelPopupUpIns = function ($scope, $modalInstance, totalDetails) {
  $scope.package = totalDetails;
  $scope.contactDetails = {};
  var insertDate = new Date();
 
  $scope.saveChanges = function () {
	 
		$scope.contactDetails.insert_date = insertDate.toJSON();
		$scope.contactDetails.contact_subject = $scope.package.hotel_name;
		$scope.contactDetails.action = "Insert";
		$modalInstance.close($scope.contactDetails);
	 
  };
  
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};




