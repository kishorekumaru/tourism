// JavaScript Document

app.controller("uploadHotelImgController", ['$scope', 'sharedEventDispatcher', '$filter', 'packServices', '$interval', '$location','$fileUploader', 'imageHotelServices', 'hotelServices'
, function($scope, sharedEventDispatcher, $filter, packServices, $interval, $location, $fileUploader, imageHotelServices, hotelServices){
 
 
 	$scope.packform = {};
	$scope.hotelId = sharedEventDispatcher.hotelId;
	$scope.totalHotels = sharedEventDispatcher.totalHotels;  
	$scope.packform.info = "";
	$scope.packform.infoDisplay = false;
	$scope.isNotLinked = true;
	$scope.imageInserted = 0;
	$scope.imageDetails = [];

	
	//Get the hotel Image information
	$scope.setDetails = function(){
		imageHotelServices.getImgDetails($scope);
	}
	
	$scope.$on("getHotelImageDetails", function($event, data){
		$scope.totalImagehotels = data[0];
		
		if($scope.totalImagehotels == ""){
			$scope.isNotLinked = true;
			return;
		}
		$scope.showImages();
	});


	$scope.showImages = function(){
		if($scope.packform.hotel_name == ""){			
			$scope.imageDetails = $filter("getByHotelId")($scope.totalImagehotels,$scope.totalHotels[0].id);		
		}else{
			$scope.imageDetails = $filter("getByHotelId")($scope.totalImagehotels,$scope.packform.hotel_name);		
		}
		if($scope.imageDetails.length == 0){
			$scope.isNotLinked = true;
		}else{
			$scope.isNotLinked = false;
		}

	}

	//Check if the totalImages are exist
	if($scope.totalHotels.length==0){
		 hotelServices.getHotels($scope);
	}else{
		//Sets the value if the hotel is selected from hotel Display
		if($scope.hotelId != 0){
			$scope.packform.hotel_name = $scope.hotelId;
			$scope.setDetails();
		}	
	}
	
	$scope.$on('loadDetails',function(event, data){
		$scope.totalHotels  = data[0].data;
	});
	


	//Get the hotel Image infromation based upon the hotel selection
	$scope.getHotelValue = function(){
		$scope.setDetails();
	}
	
	//Redirect to the hotel page without resetting any items
	$scope.goToHotel = function(){
		$location.path("/hotels");
	}
	
	
	$scope.insertImageData = function(response){
			var sendObject = new Object();
			var insertDate = new Date();
			if($scope.packform.hotel_name == ""){			
				sendObject.hotel_id = $scope.totalHotels[0].id;		
			}else{
				sendObject.hotel_id = $scope.packform.hotel_name;		
			}
			sendObject.hotel_big_img = response.big_img;
			sendObject.hotel_small_img = response.small_img;
			sendObject.hotel_thumb_img = response.thumb_img;
			sendObject.INSERT_DATE = insertDate.toJSON();
			imageHotelServices.addImgDetails(sendObject, $scope);
	}
	
	$scope.$on('imagesHotelInserted', function(){
		$scope.imageInserted++;
		if($scope.imageInserted  == $scope.uploader.queue.length){
			$scope.setDetails();
		}
	});
	
	
	//Delete Images
	$scope.deleteImage = function(id){
		if (confirm('Are you sure you want to delete?')) {
			
		}
	}
	
	$scope.on('onDeleteImageUnlink',function($event, id){
		imageHotelServices.deleteImgDetails({'id':id}, $scope);  
	});
	
	$scope.$on('onDeleteHotelImageSuccess', function($event){
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