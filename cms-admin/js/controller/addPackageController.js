// JavaScript Document
app.controller("addPackageController", function($scope,$filter, $location, packServices, dayDetailServices, sharedEventDispatcher){

	$scope.dayIntervals = [{value:1, text:"1 Day"},
	{value:2, text:"2 Days"},
	{value:3, text:"3 Days"},
	{value:4, text:"4 Days"},
	{value:5, text:"5 Days"},
	{value:6, text:"6 Days"},
	{value:7, text:"7 Days"},
	{value:8, text:"8 Days"},
	{value:9, text:"9 Days"},
	{value:10, text:"10 Days"},
	{value:11, text:"11 Days"},
	{value:12, text:"12 Days"},
	{value:13, text:"13 Days"},
	{value:14, text:"14 Days"},
	{value:15, text:"15 Days"}];
	
	if(sharedEventDispatcher.editPackagesRetour.id != undefined){
		$scope.pack= sharedEventDispatcher.editPackagesRetour;
		$scope.isEdit = true;
		$scope.pack.package_valid_from = $filter('date')($scope.pack.package_valid_from.split(" ")[0],'medium');
		$scope.pack.package_valid_to =$filter('date')($scope.pack.package_valid_to.split(" ")[0], 'medium');;
		$scope.pack.package_duration = parseInt($scope.pack.package_duration);
	}else{
		packServices.packageCount($scope);
		$scope.isEdit = false;
	}
	$scope.saveContinue = function(){
		$scope.tabset.isSecondTab = true;
		$scope.tabset.secondActive = true;

		$scope.pack.package_valid_from = $filter('date')($scope.tabset.scopeValidFrom[0].dt, 'yyyy-MM-dd');	
		$scope.pack.package_valid_to = $filter('date')($scope.tabset.scopeValidTo[0].dt, 'yyyy-MM-dd');
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
		 if(!$scope.isEdit){
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
	}
	
	$scope.$on("dateValidChanged", function(event, data){
		if(data[0].dateId == "valid_from"){
			$scope.tabset.scopeValidFrom = data
		}else{
			$scope.tabset.scopeValidTo = data
		}
	});
	
	
	//** http return function
	$scope.$on('packageCount',function(event, data){		
		if(!$scope.isEdit){
			var incrementByOne = 
			$scope.pack.package_code = "GLACIER_TRPK_10100" + data ;
			$scope.packageVal.id = data; 
		}else{
			$scope.packageVal.id = $scope.pack.id;
		}
		
	});
	
	$scope.$on('daysInserted', function(event){
			$scope.packageVal.dayValues++;
			if($scope.packageVal.dayValues ==  parseInt($scope.pack.package_duration)-1){
				alert("Package created");
				$scope.resetFun();
				$location.path("/packages");
			}
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

