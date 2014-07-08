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
		    var getPackCount= $http.post("php/api/getPackages.php?method=getPackLastId&jsoncallback=");
			getPackCount.then(function(data){	
					var incrementByOne  = parseInt(data.data) + 1;
					scope.$emit('packageCount', [incrementByOne]); 				
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


app.factory("dayDetailServices", function($http){
	var dayDetailServicesVar = {};
		
	dayDetailServicesVar.addDayDetails = function(dayObj, scope){
		    var addDayDetails = $http.post("php/api/getPackages.php?method=addDayDetails&jsoncallback=", dayObj);
			addDayDetails.then(function(data){	
				if(data.data == "1"){			
					scope.$emit('daysInserted');
				}
		});
	}
	
	dayDetailServicesVar.getDayDetails = function(dayObj, scope){
		    var addDayDetails = $http.post("php/api/getPackages.php?method=getDayDetails&jsoncallback=");
			addDayDetails.then(function(data){	
				scope.$emit('getDayDetails', [data.data]);
		});
	}
	
	dayDetailServicesVar.editDayDetails = function(selectedItem, scope){
		  var editDayDetails= $http.post("php/api/getPackages.php?method=editDayDetails&jsoncallback=", selectedItem);
			editDayDetails.then(function(data){				
				if(data.data == "1"){
					scope.$emit('onAddSuccess'); 
				}
			});
	}
			
		dayDetailServicesVar.deleteDetails = function(idValue, scope){
		    var deletePack = $http.post("php/api/getPackages.php?method=deleteDetails&jsoncallback=", idValue);
			deletePack.then(function(data){	
				if(data.data == "1"){			
					scope.$emit('onDeleteSuccess');
				}
			});
		}

	
	return dayDetailServicesVar;
});