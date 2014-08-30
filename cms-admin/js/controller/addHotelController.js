// JavaScript Document
app.controller("addHotelController", function($scope,$filter, $location, hotelAddServices, dayDetailServices, sharedEventDispatcher,
 hotelLinkServices, hotelServices, editServices){

	$scope.dayIntervals = [];
	
	$scope.totalCountries = [];
	
	$scope.hotel = {};
	$scope.hotel.package_valid_from;
	$scope.hotel.package_valid_to;
	$scope.isloading = true;
	
	//Load the currency details
	hotelServices.getAllCountries($scope);
	
	
	$scope.$on("onGetCountryDetails", function($event, data){
		$scope.totalCountries = data
		$scope.isloading = false;
	});
	
	
	
		
		
	if(sharedEventDispatcher.editHotelPackagesRetour.id != undefined){
		$scope.hotel= sharedEventDispatcher.editHotelPackagesRetour;
		$scope.isEdit = true;
		var valid_from =Date.parse($scope.hotel.package_valid_from);
		var valid_to = Date.parse($scope.hotel.package_valid_to);
		$scope.hotel.package_valid_from =  $filter('date')(valid_from, 'MM/dd/yyyy');
		$scope.hotel.package_valid_to =  $filter('date')(valid_to, 'MM/dd/yyyy');
		$scope.hotel.hotel_cost = parseInt($scope.hotel.hotel_cost);
		$scope.hotel.hotel_duration = parseInt($scope.hotel.hotel_duration);
	}else{
		
		hotelServices.packageCount($scope);
		$scope.isEdit = false;
	}
	$scope.saveContinue = function(){
		$scope.tabset.isSecondTab = true;
		$scope.tabset.secondActive = true;

	};
	
	$scope.$on('packageHotelCount',function(event, data){		
		if(!$scope.isEdit){
			$scope.hotel.package_code = "GLACIER_HTPK_10100" + data ;
			$scope.packageVal.id = data; 
		}else{
			$scope.packageVal.id = $scope.hotel.id;
		}
		
	});
	
	
	$scope.save2Continue = function(){
		$scope.tabset.isThirdTab = true;
		$scope.tabset.thirdActive = true;
	};
	
	$scope.back1 = function(){
		$scope.tabset.isfirstTab = true;
		$scope.tabset.firstActive = true;
	}
	$scope.back2 = function(){
		$scope.tabset.isSecondTab = true;
		$scope.tabset.secondActive = true;
	}
	
	$scope.saveSubmit = function(){
		var insertDate = new Date();
		var valid_from =new Date($scope.hotel.package_valid_from);
		var valid_to = new Date($scope.hotel.package_valid_to);
		$scope.hotel.package_valid_from =  $filter('date')(valid_from, 'yyyy-MM-dd');
		$scope.hotel.package_valid_to =  $filter('date')(valid_to, 'yyyy-MM-dd');

		 if(!$scope.isEdit){
			 $scope.hotel.insert_date = insertDate.toJSON();
			 hotelAddServices.addHotels($scope.hotel, $scope);
		 }else{
		 	$scope.hotel.MODIFIED_DATE = insertDate.toJSON();
			editServices.editUser($scope.hotel, $scope); 
		 }
		$scope.isEdit = false;		
	}
	
	
	
	
	
	$scope.$on('reloadDetails', function(event, isadded){
		if(isadded){
			alert("Hotel Package Created");
		}else{
			alert("Hotel Package Updated");
		}
		$scope.resetFun();
		$location.path("/hotels");
	});
	
	
	
	$scope.resetFun = function(){
		if($scope.isEdit != true){
			$scope.hotel={};
			$scope.hotel.package_code = "";
		}
		$scope.tabset = {};
		$scope.packageVal ={};
		$scope.packageVal.id=0;
		$scope.packageVal.dayValues = 0;
		$scope.tabset.isfirstTab = "true";
		$scope.tabset.isSecondTab = "false";
		$scope.tabset.isThirdTab = "false";
		$scope.tabset.firstActive =true;
		$scope.tabset.secondActive = false;
		$scope.tabset.thirdActive = false;
		$scope.tabset.scopeValidFrom = "";
		$scope.tabset.scopeValidTo = "";
	}
	
	$scope.cancelEdit = function(){
		$scope.isEdit = false;
		$scope.resetFun();
		sharedEventDispatcher.editHotelPackagesRetour = {};
		$location.path("/hotels");
	}
	
	
	
		$scope.resetFun();
});

