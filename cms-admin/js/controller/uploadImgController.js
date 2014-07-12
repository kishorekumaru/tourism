// JavaScript Document

app.controller("uploadImgController", ['$scope', 'sharedEventDispatcher', '$filter', 'packServices', '$interval', '$location','$fileUploader', 'imageServices'
, function($scope, sharedEventDispatcher, $filter, packServices, $interval, $location, $fileUploader, imageServices){
 
 
 	$scope.packform = {};
	$scope.packageId = sharedEventDispatcher.packageId;
	$scope.totalPackages = sharedEventDispatcher.totalPackages;  
	$scope.packform.info = "";
	$scope.packform.infoDisplay = false;
	$scope.isNotLinked = true;
	$scope.package = {};
	$scope.imageInserted = 0;
	$scope.imageDetails = [];

	
	//Get the package Image information
	$scope.setDetails = function(){
		imageServices.getImgDetails($scope);
	}
	
	$scope.$on("getImageDetails", function($event, data){
		$scope.totalImagePackages = data[0];
		
		if($scope.totalImagePackages == ""){
			$scope.isNotLinked = true;
			return;
		}
		$scope.showImages();
	});


	$scope.showImages = function(){
		if($scope.packform.packages_name == ""){			
			$scope.imageDetails = $filter("getByPackageId")($scope.totalImagePackages,$scope.totalPackages[0].id);		
		}else{
			$scope.imageDetails = $filter("getByPackageId")($scope.totalImagePackages,$scope.packform.packages_name);		
		}
		if($scope.imageDetails.length == 0){
			$scope.isNotLinked = true;
		}else{
			$scope.isNotLinked = false;
		}

	}

	
	//Sets the value if the package is selected from Package Display
	if($scope.packageId != 0){
		$scope.packform.packages_name = $scope.packageId;
		$scope.setDetails();
	}	


	//Get the package Image infromation based upon the package selection
	$scope.getPackValue = function(){
		$scope.setDetails();
	}
	
	//Redirect to the package page without resetting any items
	$scope.goToPackage = function(){
		$location.path("/packages");
	}
	
	
	$scope.insertImageData = function(response){
			var sendObject = new Object();
			var insertDate = new Date();
			if($scope.packform.packages_name == ""){			
				sendObject.package_id = $scope.totalPackages[0].id;		
			}else{
				sendObject.package_id = $scope.packform.packages_name;		
			}
			sendObject.package_big_img = response.big_img;
			sendObject.package_small_img = response.small_img;
			sendObject.package_thumb_img = response.thumb_img;
			sendObject.INSERT_DATE = insertDate.toJSON();
			imageServices.addImgDetails(sendObject, $scope);
	}
	
	$scope.$on('imagesInserted', function(){
		$scope.imageInserted++;
		if($scope.imageInserted  == $scope.uploader.queue.length){
			$scope.setDetails();
		}
	});
	
	
	//Delete Images
	$scope.deleteImage = function(id){
		if (confirm('Are you sure you want to delete?')) {
			var packItems = $filter("getById")($scope.totalImagePackages ,id);
			var sendObj = new Object();
			try{
				sendObj.big_img = packItems.package_big_img;
				sendObj.small_img = packItems.package_small_img;
				sendObj.thumb_img = packItems.package_thumb_img;
				imageServices.unlinkImages($scope, sendObj, id);
			}catch(err){
				alert(err.message);
			}
		}
	}
	
	
	$scope.$on('onDeleteImageUnlink',function($event, id){
		imageServices.deleteImgDetails({'id':id}, $scope);  
	});
	$scope.$on('onDeleteImageSuccess', function($event){
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
                { key: 'value' }
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
			$scope.insertImageData(response);
        });

        uploader.bind('progressall', function (event, progress) {
            console.info('Total progress: ' + progress);
        });

        uploader.bind('completeall', function (event, items) {
            console.info('Complete all', items);
        });

    
}]);