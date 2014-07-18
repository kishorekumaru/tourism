// JavaScript Document
app.factory('sessionServices',['$http',function($http){
	return{
		set:function(key, value){
			return sessionStorage.setItem(key, value);
		},
		get:function(key){
			return sessionStorage.getItem(key);
		},
		destory:function(key){
			return sessionStorage.removeItem(key);
		}
	}
}]);


app.factory('sharedEventDispatcher', function($rootScope, $location){
	var sharedEventDispatch = {};
	
	sharedEventDispatch.hotelId = 0;
	sharedEventDispatch.totalHotels = [];
	sharedEventDispatch.packageId = 0;
	
	sharedEventDispatch.totalPackages = [];
	sharedEventDispatch.editPackagesRetour = {};
	var totalImagePackages = [];
	
	
	sharedEventDispatch.sharePackageID = function(id){
		this.packageId=id;
	};
	
	sharedEventDispatch.sharePackEditDetails = function(editPackDetails){
		this.editPackagesRetour=editPackDetails;
	};
	
	sharedEventDispatch.totalPackagesObj = function(totalPackages){
		this.totalPackages=totalPackages;
	};

	sharedEventDispatch.totalHotelsObj = function(totalHotels){
		this.totalHotels=totalHotels;
	};
	
	sharedEventDispatch.setTotalImagePackages = function(totalImagePackages){
		this.totalImagePackages=totalImagePackages;
	};
	
	sharedEventDispatch.getTotalImagePackages = function(){
		return this.totalImagePackages;
	};
	
	
	
	
	sharedEventDispatch.shareHotelID = function(id){
		this.hotelId=id;
	};
	
	return sharedEventDispatch;
});