// JavaScript Document
app.controller("addPackageController", function($scope, $rootScope, $filter, $location, packServices){

	$scope.dayIntervals = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	if($rootScope.editPackagesRetour != {}){
		$scope.pack= $rootScope.editPackagesRetour;
		$scope.isEdit = true;
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
	
	$scope.$on("dateValidChanged", function(event, data){
		if(data[0].dateId == "valid_from"){
			$scope.tabset.scopeValidFrom = data
		}else{
			$scope.tabset.scopeValidTo = data
		}
	});
	
	
	//** http return function
	$scope.$on('packageCount',function(event, data){		
		if(!$scope.isEdit)
			$scope.pack.package_code = "GLACIER_TRPK_10100" + data ;
	});
	
	$scope.$on('PackageAddSuccess',function(event){		
		alert("Package created");
		$scope.resetFun();
		$location.path("/packages");
	});
	
	$scope.$on('PackageEditedSuccess',function(event){		
		alert("Package Edited");
		$scope.resetFun();
		$rootScope.editPackagesRetour = {};
		$location.path("/packages");
	});
	
	$rootScope.$on('editPackagesRetour', function(event, selectedDetails){
		alert('catched');
		$scope.isEdit = true;		
	});
	
	$scope.resetFun = function(){
		if($scope.isEdit != true){
			$scope.pack={};
		}
		$scope.tabset = {};
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
		$rootScope.editPackagesRetour = {};
		$location.path("/packages");
	}
	
		$scope.resetFun();
});

