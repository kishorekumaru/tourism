// JavaScript Document
app.controller("hotelController", function($scope, $modal, $filter, hotelServices, deleteServices, editServices, $location, sharedEventDispatcher, imageHotelServices, hotelAddServices, packServices){
	
	$scope.hotelDetails = "";
	$scope.itemsPerPage = 2;
	$scope.isNameASC = "ASC";
	$scope.isRatingASC = "ASC";
	$scope.currentPage = 1;
	$scope.totalImagehotels = [];
    $scope.noImageFile = "no-image.jpg";
 	$scope.imageDetails = [];
    $scope.isHotelloading=true;
	
	//Load the currency details
	packServices.getAllCountries($scope);
	
	
	$scope.$on("onGetCountryDetails", function($event, data){
		$scope.totalCountries = data
		hotelServices.getHotels($scope);
	});
	
	
	$scope.$on('loadDetails',function(event, data){
		$scope.hotelDetails  = data[0].data;
		$scope.totalItems =  $scope.hotelDetails.length;
		$scope.hotelDetailsPage = $scope.hotelDetails.slice(0, $scope.itemsPerPage);
		$scope.currentPage = 1;
		
		//Store it in global variable 
		sharedEventDispatcher.totalHotelsObj($scope.hotelDetails);
		imageHotelServices.getImgDetails($scope);
	});
	
	$scope.$on("getHotelImageDetails", function($event, data){
		$scope.totalImagehotels = data[0];
		
		for(var i=0;i< $scope.hotelDetails.length;i++){
			$scope.imageDetails = $filter("getByHotelId")($scope.totalImagehotels,$scope.hotelDetails[i].id);
			if($scope.imageDetails.length){	
				$scope.hotelDetails[i].first_image = $scope.imageDetails[0].hotel_thumb_img;
			}else{
				$scope.hotelDetails[i].first_image =  $scope.noImageFile;
			}
		}
		
		$scope.isHotelloading=false;
	});
	
	$scope.$on('reloadDetails', function(event){
		hotelServices.getHotels($scope);
		$scope.currentPage = 1;
		$scope.isHotelloading=true;
	});
	
	
	$scope.sortByName = function(){
		//Toggle SORT Values
		($scope.isNameASC == "ASC")?$scope.isNameASC="DESC":$scope.isNameASC="ASC";
		hotelServices.getHotelsByOrder({'col':"hotel_name",'ORDER':$scope.isNameASC},$scope);
	};
	
	$scope.sortByRating = function(){
		($scope.isRatingASC == "ASC")?$scope.isRatingASC="DESC":$scope.isRatingASC="ASC";
		hotelServices.getHotelsByOrder({'col':"hotel_rating",'ORDER':$scope.isRatingASC},$scope);
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
		$scope.hotelDetailsPage = $scope.hotelDetails.slice(start,end);
	};
	
	$scope.editHotelItem = function (id){
		
	var selectedDetails = $filter('getById')($scope.hotelDetails, id);
	var editInstance = $modal.open({
	templateUrl: 'myModalContent.html',
	controller: popupControllerIns,
	resolve: {
		headerName: function () {
			return "Edit Hotel Details";
		},
		selectedDetails:function(){
			return selectedDetails;
		}		 
		}
	});

	
    editInstance.result.then(function (userItems) {
		  editServices.editUser(userItems, $scope);
	});
		
	};
	
	
	$scope.openWindow = function () {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: popupControllerIns,
	  resolve: {
        headerName: function () {
          return "Add Hotel Details";
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

	$scope.manageImage = function(id){
		sharedEventDispatcher.shareHotelID(id);
		$location.path("/hotelImages");
	}
	
	$scope.deleteItem = function (id){
		if (confirm('Are you sure you want to delete?')) {
    		deleteServices.deleteHotel({'id':id},$scope);
		} 
	};



});





var popupControllerIns = function ($scope, $modalInstance, headerName, selectedDetails, packServices) {
  $scope.headerName = headerName;
  $scope.hotel = {};
  $scope.data = {};
  
   //Load the currency details
  packServices.getAllCountries($scope);
  
  $scope.$on("onGetCountryDetails", function($event, data){
	$scope.totalCountries = data
  });
  
  var insertDate = new Date();
  
  if(selectedDetails != ""){
	  $scope.hotel.hotel_name = selectedDetails.hotel_name;
	  $scope.hotel.hotel_overview = selectedDetails.hotel_overview;
	  $scope.hotel.hotel_address = selectedDetails.hotel_address;
	  $scope.hotel.hotel_country = selectedDetails.hotel_country;
	  $scope.hotel.hotel_email = selectedDetails.hotel_email;
	  $scope.hotel.hotel_phone = selectedDetails.hotel_phone;
	  $scope.hotel.hotel_web_url = selectedDetails.hotel_web_url;
	  $scope.hotel.hotel_rating = selectedDetails.hotel_rating;
	  $scope.hotel.hotel_facilities = selectedDetails.hotel_facilities;
	  $scope.hotel.id = selectedDetails.id;
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

