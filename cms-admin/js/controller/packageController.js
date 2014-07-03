// JavaScript Document
app.controller("packageController", function($scope, $modal, $filter, hotelServices, deleteServices, editServices){
	$scope.headerName = "Employee Details";
	$scope.hotelDetails = "";
	$scope.itemsPerPage = 5;
	
	
   
  
	hotelServices.getHotels($scope);
	
	$scope.$on('loadDetails',function(event, data){
		$scope.hotelDetails  = data[0].data;
		$scope.totalItems =  $scope.hotelDetails.length;
		$scope.hotelDetailsPage = $scope.hotelDetails.slice(0, $scope.itemsPerPage);
		$scope.currentPage = 1;
	});
	
	$scope.$on('reloadDetails', function(event){
		hotelServices.getHotels($scope);
		$scope.currentPage = 1;
	});
	
	
	$scope.sortByName = function(){
		hotelServices.getHotelsByOrder({'col':"hotel_name"},$scope);
	};
	
	$scope.sortByRating = function(){
		hotelServices.getHotelsByOrder({'col':"hotel_rating"},$scope);
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
	
	$scope.deleteItem = function (id){
		if (confirm('Are you sure you want to delete?')) {
    		deleteServices.deleteHotel({'id':id},$scope);
		} 
	};

});


app.controller("popupController",function ($scope, $modal, hotelAddServices) {

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
  
});



var popupControllerIns = function ($scope, $modalInstance, headerName, selectedDetails) {
  $scope.headerName = headerName;
  $scope.hotel = {};
  $scope.data = {};

  var insertDate = new Date();
  
  if(selectedDetails != ""){
	  $scope.hotel.hotel_name = selectedDetails.hotel_name;
	  $scope.hotel.hotel_overview = selectedDetails.hotel_overview;
	  $scope.hotel.hotel_address = selectedDetails.hotel_address;
	  $scope.hotel.hotel_country_id = selectedDetails.hotel_country_id;
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

app.filter('getById', function() {
  return function(array, id) {
	     var returnArry = [];
			for(var i=0; i<array.length; i++) {
				if (array[i].id == +id) {
					return array[i];
				}
		}
    };
    return returnArry;
});