// JavaScript Document

app.controller("testimonialController", function($scope, $modal, $filter,  $location, testServices){
	
		$scope.details = "";
		$scope.itemsPerPage = 10;
		$scope.isNameASC = "ASC";
		$scope.currentPage = 1;
	
		testServices.crudCategory({"action":"Get"}, $scope);
		$scope.isCatloading=true;
		
		$scope.$on('loadtestDetails',function(event, data){
			$scope.details  = data;
			$scope.totalItems =  $scope.details.length;
			$scope.detailsPage = $scope.details.slice(0, $scope.itemsPerPage);
			$scope.currentPage = 1;
			
			//Release the loading 
			$scope.isCatloading=false;
		});
	
	
	
		$scope.$on('reloadtestDetails', function(event){
			testServices.crudCategory({"action":"Get"}, $scope);
			$scope.currentPage = 1;
			$scope.isCatloading=true;
		});
		
	
		$scope.sortByName = function(){
			//Toggle SORT Values
			($scope.isNameASC == "ASC")?$scope.isNameASC="DESC":$scope.isNameASC="ASC";
			testServices.crudCategory({'col':"client_name",'ORDER':$scope.isNameASC, 'action':'Order'},$scope);
		};
	
	
		//Searching the values from search Textbox
		$scope.getChar = function($event){
			var selectedDetails;
			if($event.target.value != ""){
				selectedDetails = $filter('filter')($scope.details, $event.target.value)
				$scope.totalItems =  selectedDetails.length;
				$scope.detailsPage = selectedDetails.slice(0, $scope.itemsPerPage);
			}else{				
				$scope.totalItems =  $scope.details.length;
				$scope.detailsPage = $scope.details.slice(0, $scope.itemsPerPage);
			}
			$scope.currentPage = 1;
		};
	
	
		$scope.pageChanged = function(currentPage){
			var start = (currentPage-1) * $scope.itemsPerPage;
			var end = start + $scope.itemsPerPage;
			$scope.detailsPage = $scope.details.slice(start,end);
		};
		
	
	
		$scope.editHotelItem = function (id){
			var selectedDetails = $filter('getById')($scope.details, id);
			var editInstance = $modal.open({
			templateUrl: 'testContent.html',
			controller: popupTestiControllerIns,
			resolve: {
				headerName: function () {
					return "Edit Testimonial";
				},
				selectedDetails:function(){
					return selectedDetails;
				},	
				totalDetails:function(){
					return $scope.details;
				} 
				}
		});


	
		editInstance.result.then(function (userItems) {
			  testServices.crudCategory(userItems, $scope);
		});
		
	};
	
	
	$scope.openWindow = function () {

		var modalInstance = $modal.open({
		  templateUrl: 'testContent.html',
		  controller: popupTestiControllerIns,
		  resolve: {
			headerName: function () {
			  return "Add Testimonial";
				},
			  selectedDetails: function(){
				return "";
			  },totalDetails:function(){
					return $scope.details;
				} 
			  }
		});
		
		
		 modalInstance.result.then(function (userItems) {
			  testServices.crudCategory(userItems, $scope);
		});
	   };

	$scope.deleteItem = function (id){
		if (confirm('Are you sure you want to delete?')) {
			testServices.crudCategory({'id':id, 'action' : 'Delete'},$scope);
		} 
	};



});





var popupTestiControllerIns = function ($scope, $filter, $modalInstance, headerName, selectedDetails, totalDetails) {
  $scope.headerName = headerName;
  $scope.test = {};
  $scope.data = {};
  $scope.data.isExist = false;
  
  var insertDate = new Date();
  
  if(selectedDetails != ""){
	  $scope.test.client_name = selectedDetails.client_name;
	  $scope.test.client_title = selectedDetails.client_title;
	  $scope.test.client_content = selectedDetails.client_content;
	  $scope.test.id = selectedDetails.id;
	  $scope.test.MODIFIED_DATE = insertDate.toJSON(); 
	  $scope.test.action = "Edit";
  }else{   
  	  $scope.test.action = "Insert";
	  $scope.test.INSERT_DATE = insertDate.toJSON();
  }
  
  

  
  $scope.saveChanges = function () {
	$modalInstance.close($scope.test);
  };

	
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};





// JavaScript Document
app.controller("newsEventsController", function($scope, $modal, $filter,  $location, newsServices ){
	
		$scope.details = "";
		$scope.itemsPerPage = 10;
		$scope.isNameASC = "ASC";
		$scope.currentPage = 1;
	
		newsServices.crudCategory({"action":"Get"}, $scope);
		$scope.isCatloading=true;
		
		$scope.$on('loadnewsDetails',function(event, data){
			$scope.details  = data;
			$scope.totalItems =  $scope.details.length;
			$scope.detailsPage = $scope.details.slice(0, $scope.itemsPerPage);
			$scope.currentPage = 1;
			
			//Release the loading 
			$scope.isCatloading=false;
		});
	
	
	
		$scope.$on('reloadnewsDetails', function(event){
			newsServices.crudCategory({"action":"Get"}, $scope);
			$scope.currentPage = 1;
			$scope.isCatloading=true;
		});
		
	
		$scope.sortByName = function(){
			//Toggle SORT Values
			($scope.isNameASC == "ASC")?$scope.isNameASC="DESC":$scope.isNameASC="ASC";
			newsServices.crudCategory({'col':"news_title",'ORDER':$scope.isNameASC, 'action':'Order'},$scope);
		};
	
	

	
		$scope.pageChanged = function(currentPage){
			var start = (currentPage-1) * $scope.itemsPerPage;
			var end = start + $scope.itemsPerPage;
			$scope.detailsPage = $scope.details.slice(start,end);
		};
		
	
	
		$scope.editItem = function (id){
			var selectedDetails = $filter('getById')($scope.details, id);
			var editInstance = $modal.open({
			templateUrl: 'newsContent.html',
			controller: popupNewControllerIns,
			resolve: {
				headerName: function () {
					return "Edit News";
				},
				selectedDetails:function(){
					return selectedDetails;
				},	
				totalDetails:function(){
					return $scope.details;
				} 
				}
		});


	
		editInstance.result.then(function (userItems) {
			  newsServices.crudCategory(userItems, $scope);
		});
		
	
	};
	
	//Searching the values from search Textbox
	$scope.getChar = function($event){
		var selectedDetails;
		if($event.target.value != ""){
			selectedDetails = $filter('filter')($scope.details, $event.target.value)
			$scope.totalItems =  selectedDetails.length;
			$scope.detailsPage = selectedDetails.slice(0, $scope.itemsPerPage);
		}else{				
			$scope.totalItems =  $scope.details.length;
			$scope.detailsPage = $scope.details.slice(0, $scope.itemsPerPage);
		}
		$scope.currentPage = 1;
	};
	
	$scope.openWindow = function () {

		var modalInstance = $modal.open({
		  templateUrl: 'newsContent.html',
		  controller: popupNewControllerIns,
		  resolve: {
			headerName: function () {
			  return "Add News";
				},
			  selectedDetails: function(){
				return "";
			  },totalDetails:function(){
					return $scope.details;
				} 
			  }
		});
		
		
		 modalInstance.result.then(function (userItems) {
			  newsServices.crudCategory(userItems, $scope);
		});
	   };

	$scope.deleteItem = function (id){
		if (confirm('Are you sure you want to delete?')) {
			newsServices.crudCategory({'id':id, 'action' : 'Delete'},$scope);
		} 
	};



});





var popupNewControllerIns = function ($scope, $filter, $modalInstance, headerName, selectedDetails, totalDetails) {
  $scope.headerName = headerName;
  $scope.news = {};
  $scope.data = {};
  $scope.data.isExist = false;
  
  var insertDate = new Date();
  
  if(selectedDetails != ""){
	  $scope.news.news_title = selectedDetails.news_title;
	  $scope.news.news_content = selectedDetails.news_content;
	  $scope.news.id = selectedDetails.id;
	  $scope.news.MODIFIED_DATE = insertDate.toJSON(); 
	  $scope.news.action = "Edit";
  }else{   
  	  $scope.news.action = "Insert";
	  $scope.news.INSERT_DATE = insertDate.toJSON();
  }
  


  
  $scope.saveChanges = function () {
	$modalInstance.close($scope.news);
  };

	
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};