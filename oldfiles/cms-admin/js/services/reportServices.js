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


app.factory("contactServices", function($http){
	
	//Declar a return object
	var contactServicesObj = {};
	
	//Function to get all the test services

	contactServicesObj.crudCategory = function(contactItems, scope){
			var getCntList= $http.post("php/api/getReports.php?method=contactDetails&jsoncallback=",contactItems);
			getCntList.then(function(data){
					if(contactItems.action.toString() != 'Get' && contactItems.action.toString() != 'Order'){
						scope.$emit('reloadContactDetails', data.data);			
					}else{
						scope.$emit('loadContactDetails', data.data);
					}
			});
	 };
	
	
	return contactServicesObj;
	
});



app.factory("bannerImgServices", function($http){
	
	//Declar a return object
	var bannerServicesObj = {};
	
	//Function to get all the test services

	bannerServicesObj.crudCategory = function(bannerItems, scope){
			var getBnrList= $http.post("php/api/getReports.php?method=bannerImages&jsoncallback=",bannerItems);
			getBnrList.then(function(data){
					if(bannerItems.action.toString() != 'Get' && bannerItems.action.toString() != 'Order'){
						if(bannerItems.action.toString() == 'Insert'){
							scope.$emit('imagesInserted');		
						}else{
							scope.$emit('reloadBannerDetails', data.data);	
						}
					}else{
						scope.$emit('loadBannerDetails', data.data);
					}
			});
	 };
	
	
	return bannerServicesObj;
	
});