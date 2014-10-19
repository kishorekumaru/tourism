// JavaScript Document
app.factory("catServices", function($http, $rootScope, sessionServices, $location){
	
	//Declar a return object
	var catServicesObj = {};
	
	//Function to get all the cat services

	catServicesObj.crudCategory = function(catItems, scope){
			var getCatList= $http.post("php/api/getCategory.php?method=catDetails&jsoncallback=",catItems);
			getCatList.then(function(data){
					if(catItems.action.toString() != 'Get' && catItems.action.toString() != 'Order'){
						scope.$emit('reloadCatDetails', data.data);			
					}else{
						scope.$emit('loadCatDetails', data.data);
					}
			});
	 };
	
	
	return catServicesObj;
	
});



app.factory("linkHotelServices", function($http, $rootScope, sessionServices, $location){
	
	//Declar a return object
	var linkHotelServicesObj = {};
	
	//Function to get all the cat services

	linkHotelServicesObj.crudCategory = function(linkItems, scope){
			var getLinkList= $http.post("php/api/getCategory.php?method=linkHotelDetails&jsoncallback=", linkItems);
			getLinkList.then(function(data){
					if(linkItems.action.toString() != 'Get' && linkItems.action.toString() != 'Order'){
						scope.$emit('reloadLinkHotelDetails', data.data);			
					}else{
						scope.$emit('loadLinkHotelDetails', data.data);
					}
			});
	 };
	
	
	return linkHotelServicesObj;
	
});