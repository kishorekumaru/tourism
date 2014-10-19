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


// JavaScript Document
app.controller("contactUsController", function($scope, $modal, $filter,  $location, contactServices ){
		
		$scope.details = "";
		$scope.itemsPerPage = 10;
		$scope.isNameASC = "ASC";
		$scope.currentPage = 1;
	
		contactServices.crudCategory({"action":"Get"}, $scope);
		$scope.isCatloading=true;
		
		$scope.$on('loadContactDetails',function(event, data){
			$scope.details  = data;
			$scope.totalItems =  $scope.details.length;
			$scope.detailsPage = $scope.details.slice(0, $scope.itemsPerPage);
			$scope.currentPage = 1;
			
			//Release the loading 
			$scope.isCatloading=false;
		});
	
	
	
		$scope.$on('reloadContactDetails', function(event){
			contactServices.crudCategory({"action":"Get"}, $scope);
			$scope.currentPage = 1;
			$scope.isCatloading=true;
		});
		
		
		$scope.sortByName = function(){
			//Toggle SORT Values
			($scope.isNameASC == "ASC")?$scope.isNameASC="DESC":$scope.isNameASC="ASC";
			contactServices.crudCategory({'col':"is_contacted",'ORDER':$scope.isNameASC, 'action':'Order'},$scope);
		};
	
	

	
		$scope.pageChanged = function(currentPage){
			var start = (currentPage-1) * $scope.itemsPerPage;
			var end = start + $scope.itemsPerPage;
			$scope.detailsPage = $scope.details.slice(start,end);
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
		
		$scope.editContactItem = function (id){
				var selectedDetails = $filter('getById')($scope.details, id);
				var editInstance = $modal.open({
				templateUrl: 'contactUpdates.html',
				controller: popupCntControllerIns,
				resolve: {
					headerName: function () {
						return "Edit ContactDetails";
					},
					selectedDetails:function(){
						return selectedDetails;
					},	
					totalDetails:function(){
						return $scope.details;
					} 
					}
			});	
			
			 editInstance.result.then(function (userItems){
			  contactServices.crudCategory(userItems, $scope);
			});
		}
		
		
		
		$scope.deleteItem = function (id){
		if (confirm('Are you sure you want to delete?')) {
			contactServices.crudCategory({'id':id, 'action' : 'Delete'},$scope);
		} 
	};

	
});



var popupCntControllerIns = function ($scope, $filter, $modalInstance, headerName, selectedDetails, totalDetails) {
  $scope.headerName = headerName;
  $scope.contact = {};
  $scope.data = {};
  $scope.data.isExist = false;
  
  var insertDate = new Date();
  
  if(selectedDetails != ""){
	  $scope.contact.contact_subject =  selectedDetails.contact_subject;
	  $scope.contact.contact_name = selectedDetails.contact_name;
	  $scope.contact.contact_email =  selectedDetails.contact_email;
	  $scope.contact.contact_phone = selectedDetails.contact_phone;
	  $scope.contact.contact_message =  selectedDetails.contact_message;
	  $scope.contact.is_contacted = selectedDetails.is_contacted;
	  $scope.contact.contact_details = selectedDetails.contact_details;
	  $scope.contact.id = selectedDetails.id;
	  $scope.contact.MODIFIED_DATE = insertDate.toJSON(); 
	  $scope.contact.action = "Edit";
  }else{   
  	  $scope.contact.action = "Insert";
	  $scope.contact.INSERT_DATE = insertDate.toJSON();
  }
  


  
  $scope.saveChanges = function () {
	$modalInstance.close($scope.contact);
  };

	
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};



// Controller for Add Banner Image

app.controller("bannerImgCntrl", function($scope, $fileUploader, $filter, bannerImgServices, imageServices){



	$scope.imageInserted = 0;
	$scope.imageDetails = [];
	$scope.totalImagePackages = [];
	
	//Get the package Image information
	$scope.setDetails = function(){
		bannerImgServices.crudCategory({"action":"Get"}, $scope);
	}
	
	$scope.$on("loadBannerDetails", function($event, data){
		$scope.totalImagePackages = data;
		
		if($scope.totalImagePackages == ""){
			$scope.isNotLinked = true;
			return;
		}
		$scope.showImages();
	});


	$scope.showImages = function(){
				
		$scope.imageDetails = $scope.totalImagePackages 		
		
		if($scope.imageDetails.length == 0){
			$scope.isNotLinked = true;
		}else{
			$scope.isNotLinked = false;
		}

	}

	
	//Sets the value if the package is selected from Package Display
	$scope.setDetails();





	
	$scope.insertImageData = function(response, item){
			var sendObject = new Object();
			var insertDate = new Date();
			
			sendObject.img_url = response.big_img;
			sendObject.img_small_url = response.small_img;
			sendObject.img_tiny_url = response.thumb_img;
			sendObject.img_desc = item.description;
			sendObject.INSERT_DATE = insertDate.toJSON();
			sendObject.action = "Insert";
			bannerImgServices.crudCategory(sendObject,$scope);
	}
	
	$scope.$on('imagesInserted', function(){
		$scope.imageInserted++;
		if($scope.imageInserted  == $scope.uploader.queue.length){
			$scope.setDetails();
			uploader.clearQueue();
		}
	});
	
	
	//Delete Images
	$scope.deleteImage = function(id){
		if (confirm('Are you sure you want to delete?')) {
			var packItems = $filter("getById")($scope.totalImagePackages ,id);
			var sendObj = new Object();
			try{
				sendObj.big_img = packItems.img_url;
				sendObj.small_img = packItems.img_small_url;
				sendObj.thumb_img = packItems.img_tiny_url;
				imageServices.unlinkImages($scope, sendObj, id);
			}catch(err){
				alert(err.message);
			}
		}
	}
	
	
	$scope.$on('onDeleteImageUnlink',function($event, id){
		bannerImgServices.crudCategory({'id':id, 'action' : 'Delete'},$scope);
	});
	$scope.$on('reloadBannerDetails', function($event){
		$scope.setDetails();
	});
	
	//Get Number of uploaded files
	
	
	//Code for Image controller
	
	
        'use strict';

        // create a uploader with options
        var uploader = $scope.uploader = $fileUploader.create({
            scope: $scope,                          // to automatically update the html. Default: $rootScope
            url: 'php/api/uploader.php',
            formData: [
                { key: 'value'  }
            ],
            filters: [
                function (item) {                    // first user filter
                    console.info('filter1');
                    return true;
                }
            ]
        });


        // FAQ #1
        var item = {
            file: {},
            progress: 0,
            isUploaded: false,
            isSuccess: false
        };
        item.remove = function() {
            uploader.removeFromQueue(this);
        };
    
        uploader.progress = 0;


        // ADDING FILTERS

        uploader.filters.push(function (item) { // second user filter
            console.info('filter2');
            return true;
        });

        // REGISTER HANDLERS

        uploader.bind('afteraddingfile', function (event, item) {
        });

        uploader.bind('whenaddingfilefailed', function (event, item) {
        });

        uploader.bind('afteraddingall', function (event, items) {
        });

        uploader.bind('beforeupload', function (event, item) {
        });

        uploader.bind('progress', function (event, item, progress) {
            console.info('Progress: ' + progress, item);
        });

        uploader.bind('success', function (event, xhr, item, response) {
        });

        uploader.bind('cancel', function (event, xhr, item) {
            console.info('Cancel', xhr, item);
        });

        uploader.bind('error', function (event, xhr, item, response) {
            console.info('Error', xhr, item, response);
        });

        uploader.bind('complete', function (event, xhr, item, response) {
			//Get all the infromation from the response
			$scope.insertImageData(response, item);
        });

        uploader.bind('progressall', function (event, progress) {
            console.info('Total progress: ' + progress);
        });

        uploader.bind('completeall', function (event, items) {
            console.info('Complete all', items);
			
        });


});