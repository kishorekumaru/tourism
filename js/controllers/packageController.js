// JavaScript Document
app.controller("packageList", function($scope, $filter, testServices, newsServices, packServices, sharedEventDispatcher, imageServices){ 
		
		$scope.allPackageCat = [];
		$scope.totalImagePackages = [];
		$scope.noImageFile = "no-image.jpg";	
		$scope.packages =[];
		$scope.isloading=true;
		
		(!sharedEventDispatcher.getPackages().length)?packServices.getPackages($scope):$scope.packages=sharedEventDispatcher.getPackages()
			
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
		
				for(var i=0;i< $scope.packages.length;i++){
					var dateObj = new Date();
					$scope.imageDetails = $filter("getByPackageId")($scope.totalImagePackages,$scope.packages[i].id);
					if($scope.imageDetails.length){
						$scope.packages[i].first_image = $scope.imageDetails[0].package_thumb_img;
					}else{
						$scope.packages[i].first_image =  $scope.noImageFile;
					}
					
					//Add Day items
					$scope.packages[i].dayString = (parseInt($scope.packages[i].package_duration) - 1) + "Nights / " + $scope.packages[i].package_duration + "Days";
					dateObj = new Date(String($scope.packages[i].package_valid_to).split(" ")[0]);
					 $scope.packages[i].offerValid = "Offer till " + $filter("date")(dateObj, 'MMM d, y');  
				}
				
				
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
			$scope.totalCategories = $filter('orderBy')($scope.totalCategories, 'id')
			$scope.isloading=false;
			$scope.selectedIndex = 0;
			$scope.totalPackItems = $scope.packages;
	});
	
	
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