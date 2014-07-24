// JavaScript Document

app.factory("newsServices", function($http){
	
	//Declar a return object
	var newsServicesObj = {};
	
	//Function to get all the news services

	newsServicesObj.crudCategory = function(newsItems, scope){
			var getnewsList= $http.post("php/api/getReports.php?method=newsDetails&jsoncallback=",newsItems);
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
			var gettestList= $http.post("php/api/getReports.php?method=testDetails&jsoncallback=",testItems);
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