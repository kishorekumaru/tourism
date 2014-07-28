// JavaScript Document

app.factory("newsServices", function($http){
	
	//Declar a return object
	var newsServicesObj = {};
	
	//Function to get all the news services

	newsServicesObj.crudCategory = function(newsItems, scope){
			var getnewsList= $http.post("cms-admin/php/api/getReports.php?method=newsDetails&jsoncallback=",newsItems);
			getnewsList.then(function(data){
					if(newsItems.action.toString() != 'Get' && newsItems.action.toString() != 'Order'){
						scope.$emit('reloadnewsDetails', data.data);			
					}else{
						scope.$emit('loadnewsDetails', data.data);
					}
			});
	 };
	
	
	return newsServicesObj;
	
});

app.factory("testServices", function($http){
	
	//Declar a return object
	var testServicesObj = {};
	
	//Function to get all the test services

	testServicesObj.crudCategory = function(testItems, scope){
			var gettestList= $http.post("cms-admin/php/api/getReports.php?method=testDetails&jsoncallback=",testItems);
			gettestList.then(function(data){
					if(testItems.action.toString() != 'Get' && testItems.action.toString() != 'Order'){
						scope.$emit('reloadtestDetails', data.data);			
					}else{
						scope.$emit('loadtestDetails', data.data);
					}
			});
	 };
	
	
	return testServicesObj;
	
});



app.factory("packServices", function($http){
	
	var returnServices = {};
	
		returnServices.getPackages = function(scope){
			var getPackDetails= $http.get("cms-admin/php/api/getPackages.php?method=getAllPackages&jsoncallback=");
			getPackDetails.then(function(data){
				scope.$emit('loadPackDetails', [data]);
			});
		}
	
	
	returnServices.crudCategory = function(catItems, scope){
			var getCatList= $http.post("cms-admin/php/api/getCategory.php?method=catDetails&jsoncallback=",catItems);
			getCatList.then(function(data){
					if(catItems.action.toString() != 'Get' && catItems.action.toString() != 'Order'){
						scope.$emit('reloadCatDetails', data.data);			
					}else{
						scope.$emit('loadCatDetails', data.data);
					}
			});
	 };
	 
	 returnServices.getDayDetails = function(dayObj, scope){
		    var getDayDetails = $http.post("cms-admin/php/api/getPackages.php?method=getDayDetails&jsoncallback=");
			getDayDetails.then(function(data){	
				scope.$emit('getDayDetails', [data.data]);
		});
	};
	
	returnServices.getLinkDetails = function(scope, packageId){
		var getLinkDetails = $http.post("cms-admin/php/api/getHotelLinks.php?method=getHotelLink&jsoncallback=", packageId);
		getLinkDetails.then(function(data){
			scope.$emit('loadHotelLinks', [data]);			
		});
	};
	
	
	returnServices.getHotels = function(scope){
			var getHotelDetails= $http.get("cms-admin/php/api/getPackages.php?method=getAllHotels&jsoncallback=");
			getHotelDetails.then(function(data){
				scope.$emit('loadDetails', [data]);
			});
		};
	
	
	 return returnServices;
});


app.factory("imageServices", function($http){
	var imageServicesVar = {};
	imageServicesVar.getImgDetails = function(scope){
		    var addDayDetails = $http.post("cms-admin/php/api/getPackages.php?method=getImageDetails&jsoncallback=");
			addDayDetails.then(function(data){	
				scope.$emit('getImageDetails', [data.data]);
		});
	}
	return imageServicesVar;
});






app.factory('sharedEventDispatcher', function($rootScope, $location){
	var sharedEventDispatch = {};
	sharedEventDispatch.id="";
	sharedEventDispatch.hotelId = 0;
	sharedEventDispatch.totalHotels = [];
	sharedEventDispatch.packageId = 0;	
	sharedEventDispatch.totalPackages = [];
	sharedEventDispatch.totalImagePackages = [];
	sharedEventDispatch.category = [];
	
	
	sharedEventDispatch.setCateogry = function(category){
		this.category = category;
	}
	
	sharedEventDispatch.getCateogry = function(){
		return this.category;
	}
	



	sharedEventDispatch.setPackageID = function(id){
			this.id =  id;
	}

	sharedEventDispatch.getPackageID = function(){
		return this.id;
	}
	
	
	sharedEventDispatch.setPackages = function(totalPackages){
		this.totalPackages =  totalPackages;
	}

	sharedEventDispatch.getPackages = function(){
		return this.totalPackages;
	}
	
	sharedEventDispatch.setTotalImagePackages = function(totalImagePackages){
		this.totalImagePackages = totalImagePackages;
	}
	
	sharedEventDispatch.getTotalImagePackages = function(){
		return this.totalImagePackages;
	}


	return sharedEventDispatch;
});