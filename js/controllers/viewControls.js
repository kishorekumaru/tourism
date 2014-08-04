// JavaScript Document
app.controller("testimonialController", function($scope, $filter,  $location, sharedEventDispatcher, testServices ){
		 $scope.testimonialDetails = sharedEventDispatcher.getTestimonials();
		 if(!$scope.testimonialDetails.length){
			 testServices.crudCategory({'col':'INSERT_DATE','ORDER':'DESC', 'action':'Order'}, $scope);
		 }
		 
		 //Call Back Method for test details
		$scope.$on('loadtestDetails', function($event, data){
			$scope.totalTestimonials = data;
			sharedEventDispatcher.setTestimonials(data);	
		});
		
		$scope.gotoURL = function(returnURL){
			$location.path(returnURL);
		}
			 
	 $scope.headerName = "Testimonial";
});

app.controller("newsController", function($scope, $filter,  $location, sharedEventDispatcher, newsServices ){
		 $scope.newsDetails = sharedEventDispatcher.getNewsDetails();
		 if(!$scope.newsDetails.length){
			 newsServices.crudCategory({'col':'INSERT_DATE','ORDER':'DESC', 'action':'Order'}, $scope);
		 }
		 
		 //Call Back Method for test details
		$scope.$on('loadtestDetails', function($event, data){
			$scope.newsDetails = data;
			sharedEventDispatcher.setNewsDetails(data);	
		});
		
		$scope.gotoURL = function(returnURL){
			$location.path(returnURL);
		}
			 
	 $scope.headerName = "News & Updates";
});


app.controller("contactController", function($scope, $filter,  $location, sharedEventDispatcher, contactServices){
		 $scope.contactDetails = {};
		  var insertDate = new Date();
		 
		 //Call Back Method for test details
		$scope.$on("reloadContactDetails", function(){
			alert("Thanks for contacting us, Our executive will be in touch with you shortly");
			 $scope.contactDetails = {};
		});
		
		$scope.saveChanges = function(){
			if(!$scope.contactForm.$invalid){
				$scope.contactDetails.insert_date = insertDate.toJSON();
				$scope.contactDetails.action = "Insert";
				contactServices.crudCategory($scope.contactDetails, $scope);
			}
		}
		
		$scope.gotoURL = function(returnURL){
			$location.path(returnURL);
		}
			 
	 $scope.headerName = "Contact Us";
});