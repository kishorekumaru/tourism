// JavaScript Document
app.controller("addPackageController", function($scope,$filter, $location, packServices, dayDetailServices, sharedEventDispatcher,
 hotelLinkServices, catServices){

	$scope.dayIntervals = [];
	
	$scope.totalCurrencies = [];
	
	$scope.pack = {};
	$scope.pack.package_valid_from;
	$scope.pack.package_valid_to;
	$scope.isloading=true;
	
	//Load the currency details
	packServices.getAllCurrencies($scope);
	
	
	$scope.$on("onGetCurrencyDetails", function($event, data){
		$scope.totalCurrencies = data
		catServices.crudCategory({"action":"Get"}, $scope);
		$scope.isloading=false;
	});
	
	
	$scope.$on('loadCatDetails',function(event, data){
			$scope.totalCategories  = data;	
			
			if(!$scope.totalCategories.length || typeof($scope.totalCategories[0]) == "number" ){
				alert("Please create a Category and then create a package");
				$location.path("/category");
				return;
			}
	});
		
		
	if(sharedEventDispatcher.editPackagesRetour.id != undefined){
		$scope.pack= sharedEventDispatcher.editPackagesRetour;
		$scope.isEdit = true;
		var valid_from =Date.parse($scope.pack.package_valid_from);
		var valid_to = Date.parse($scope.pack.package_valid_to);
		$scope.pack.package_valid_from =  $filter('date')(valid_from, 'MM/dd/yyyy');
		$scope.pack.package_valid_to =  $filter('date')(valid_to, 'MM/dd/yyyy');
		$scope.pack.package_cost = parseInt($scope.pack.package_cost);
		$scope.pack.package_duration = parseInt($scope.pack.package_duration);
	}else{
		packServices.packageCount($scope);
		$scope.isEdit = false;
	}
	$scope.saveContinue = function(){
		$scope.tabset.isSecondTab = true;
		$scope.tabset.secondActive = true;

	};
	
	
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
		var valid_from =new Date($scope.pack.package_valid_from);
		var valid_to = new Date($scope.pack.package_valid_to);
		$scope.pack.package_valid_from =  $filter('date')(valid_from, 'yyyy-MM-dd');
		$scope.pack.package_valid_to =  $filter('date')(valid_to, 'yyyy-MM-dd');

		 if(!$scope.isEdit){
			 $scope.pack.id = $scope.packageVal.id;
			 $scope.pack.insert_date = insertDate.toJSON();
			 packServices.addPackage($scope.pack, $scope);
		 }else{
		 	$scope.pack.MODIFIED_DATE = insertDate.toJSON();
			packServices.editPack($scope.pack, $scope);
		 }
		$scope.isEdit = false;		
	}
	
	
	$scope.addDayDetails = function(package){
		var duration = parseInt(package.package_duration);
		 var insertDate = new Date();
		for(var i=1;i<=duration;i++){
			 var sendObj = new Object();
			 sendObj.package_id = parseInt($scope.packageVal.id);
			 sendObj.INSERT_DATE = insertDate.toJSON();
			 dayDetailServices.addDayDetails(sendObj,$scope);
		}
		
		//Add link details as well
		var sendObj = new Object();
		 sendObj.package_id = parseInt($scope.packageVal.id);
		 sendObj.INSERT_DATE = insertDate.toJSON();
		 hotelLinkServices.addLinkDetails(sendObj);

	}
	

	
	
	//** http return function
	$scope.$on('packageCount',function(event, data){		
		if(!$scope.isEdit){
			$scope.pack.package_code = "GLACIER_TRPK_10100" + data ;
			$scope.packageVal.id = data; 
		}else{
			$scope.packageVal.id = $scope.pack.id;
		}
		
	});
	
	$scope.$on('daysInserted', function(event, data){
			$scope.packageVal.dayValues++;
			if($scope.packageVal.dayValues ==  parseInt($scope.pack.package_duration)-1){
				alert("Package created, please add day details");
				$scope.resetFun();
				sharedEventDispatcher.sharePackageID(String(data));
				packServices.getPackages($scope);				
			}
			
		
	});
	
	$scope.$on('loadPackDetails', function(event, data){
		$scope.packages  = data[0].data;
		sharedEventDispatcher.totalPackages = $scope.packages;
		
		$location.path("/dayDetails");
	});
	
	$scope.$on('PackageAddSuccess',function(event){		
		
		 $scope.addDayDetails($scope.pack);
	});
	
	$scope.$on('PackageEditedSuccess',function(event){		
		alert("Package Edited");
		$scope.resetFun();
		sharedEventDispatcher.editPackagesRetour = {};
		$location.path("/packages");
	});
	
	
	
	$scope.resetFun = function(){
		if($scope.isEdit != true){
			$scope.pack={};
			$scope.pack.package_code = "";
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
		sharedEventDispatcher.editPackagesRetour = {};
		$location.path("/packages");
	}
	
	
	
		$scope.resetFun();
});

