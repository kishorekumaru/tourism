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