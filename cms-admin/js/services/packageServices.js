// JavaScript Document
app.factory("packServices", function($http){
	return{
		getPackages:function(scope){
			var getPackDetails= $http.get("php/api/getPackages.php?method=getAllPackages&jsoncallback=");
			getPackDetails.then(function(data){
				scope.$emit('loadPackDetails', [data]);
			});
		},
		getPackByOrder:function(orderItem, scope){
			var getPackByOrder= $http.post("php/api/getPackages.php?method=getPackByOrder&jsoncallback=", orderItem);
			getPackByOrder.then(function(data){
				scope.$emit('loadPackDetails', [data]);				
			});
		},
		addPackage:function(package, scope){
			var addPacks= $http.post("php/api/getPackages.php?method=addPackages&jsoncallback=", package);
			addPacks.then(function(data){				
				if(data.data == "1"){
					scope.$emit('PackageAddSuccess'); 
				}
			});
		},
		packageCount:function(scope){
		    var getPackCount= $http.post("php/api/getPackages.php?method=getPackageCount&jsoncallback=");
			getPackCount.then(function(data){				
					scope.$emit('packageCount', [data.data]); 				
			});

		},
		editPack:function(users, scope){
			var editUser= $http.post("php/api/getPackages.php?method=editPackages&jsoncallback=", users);
			editUser.then(function(data){				
				if(data.data == "1"){
					scope.$emit('PackageEditedSuccess'); 
				}
			});
		},
		deletePack:function(idValue, scope){
		    var deletePack = $http.post("php/api/getPackages.php?method=deletePackage&jsoncallback=", idValue);
			deletePack.then(function(data){	
				if(data.data == "1"){			
					scope.$emit('reloadPackDetails');
				}
			});
		}
		
	}
});