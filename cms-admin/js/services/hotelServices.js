// JavaScript Document

app.factory("hotelServices", function($http){
	return{
		getHotels:function(scope){
			var getHotelDetails= $http.get("php/api/getPackages.php?method=getAllHotels&jsoncallback=");
			getHotelDetails.then(function(data){
				scope.$emit('loadDetails', [data]);
			});
		},
		getHotelsByOrder:function(orderItem, scope){
			var getHotelsByOrder= $http.post("php/api/getPackages.php?method=getByOrder&jsoncallback=", orderItem);
			getHotelsByOrder.then(function(data){
				scope.$emit('loadDetails', [data]);				
			});
		},
		packageCount:function(scope){
		    var getPackCount= $http.post("php/api/getPackages.php?method=getHotelLastId&jsoncallback=");
			getPackCount.then(function(data){	
					var incrementByOne  = parseInt(data.data) + 1;
					scope.$emit('packageHotelCount', [incrementByOne]); 				
			});

		},
		getAllCountries:function(scope){
		    var deletePack = $http.post("php/resources/country.json");
			deletePack.then(function(data){							
					scope.$emit('onGetCountryDetails', data.data);
			});
			
		},
		editfeatLinks:function(scope, featuredObj){
		    var editFeatLink = $http.post("php/api/getPackages.php?method=setHotelFeatured&jsoncallback=", featuredObj);
			editFeatLink.then(function(data){							
					scope.$emit('reloadPackFeatDetails');
				
			});
		}
		
	}
});


app.factory("hotelAddServices", function($http){
	return{
		addHotels:function(hotels, scope){
			var addHotels= $http.post("php/api/getPackages.php?method=addHotels&jsoncallback=", hotels);
			addHotels.then(function(data){				
				if(String(data.data).trim() == "1" || String(data.data).trim() == ""){
					scope.$emit('reloadDetails', true); 
				}
			});
			}
		}
});

app.factory("deleteServices", function($http){
	return{
		deleteHotel:function(idValue, scope){
			var deleteHotel= $http.post("php/api/getPackages.php?method=deleteHotels&jsoncallback=", idValue);
			deleteHotel.then(function(data){				
				if(String(data.data).trim() == "1" || String(data.data).trim() == ""){
					scope.$emit('reloadDetails'); 
				}
			});
			}
		}
});


app.factory("editServices", function($http){
	return{
		editUser:function(users, scope){
			var editUser= $http.post("php/api/getPackages.php?method=editHotels&jsoncallback=", users);
			editUser.then(function(data){				
				if(String(data.data).trim() == "1" || String(data.data).trim() == ""){
					scope.$emit('reloadDetails',false); 
				}
			});
			}
			

		}
});


app.factory("uploadServices", function($http){
	return{
		uploadHoteImages:function(hotels, scope){
			var uploadHotelImage = $http.post("php/api/uploadImages.php?method=uploadHotel&jsoncallback=", hotels, {
				transformRequest:angular.identity,
				headers:{'Content-Type':undefined}
			});
			uploadHotelImage.then(function(data){
				console.log(data);
			});
		}
	}
});


app.factory("hotelLinkServices", ['$http', function($http){

	var hotelLinkServices = {};
	
		
	hotelLinkServices.addLinkDetails = function(hotellinks){
		var addLinkDetails  = $http.post("php/api/getHotelLinks.php?method=addHotelLink&jsoncallback=", hotellinks);
		addLinkDetails.then(function(data){
			console.log(data.data);	
		});
	};
	
	hotelLinkServices.getLinkDetails = function(scope, packageId){
		var getLinkDetails = $http.post("php/api/getHotelLinks.php?method=getHotelLink&jsoncallback=", packageId);
		getLinkDetails.then(function(data){
			scope.$emit('loadHotelLinks', [data, packageId]);			
		});
	};
	
	
	hotelLinkServices.editHotelLinks = function(scope, hotelLinks){
		var editHotelLinks= $http.post("php/api/getHotelLinks.php?method=editHotelLinks&jsoncallback=", hotelLinks);
		editHotelLinks.then(function(data){				
			if(String(data.data).trim() == "1" || String(data.data).trim() == ""){
					scope.$emit('reloadHotelLinkDetails'); 
			}
		});
	};
	
	
	hotelLinkServices.deleteLinkDetails = function(scope, package_id){
		var deleteLinkDetails= $http.post("php/api/getHotelLinks.php?method=deleteHotelLinksMaster&jsoncallback=", package_id);
		deleteLinkDetails.then(function(data){				
			if(String(data.data).trim() == "1" || String(data.data).trim() == ""){
					scope.$emit('reloadHotelLinkDetails', package_id); 
			}
		});
	};
	
	
	return hotelLinkServices

}]);


app.factory("imageHotelServices", function($http){
	var imageServicesVar = {};
	
	imageServicesVar.addImgDetails = function(seletedItem, scope){
			var addDayDetails = $http.post("php/api/getHotelLinks.php?method=addHotelImageDetails&jsoncallback=", seletedItem);
			addDayDetails.then(function(data){	
				scope.$emit('imagesHotelInserted');
		});
	}
	
	
	imageServicesVar.deleteImgDetails = function(idValue, scope){
		    var deletePack = $http.post("php/api/getHotelLinks.php?method=deleteHotelImageDetails&jsoncallback=", idValue);
			deletePack.then(function(data){	
				if(String(data.data).trim() == "1" || String(data.data).trim() == ""){			
					scope.$emit('onImgEditImageSuccess');
				}
			});
		}
		
	imageServicesVar.getImgDetails = function(scope){
		    var addDayDetails = $http.post("php/api/getHotelLinks.php?method=getHotelImageDetails&jsoncallback=");
			addDayDetails.then(function(data){	
				scope.$emit('getHotelImageDetails', [data.data]);
		});
	}
	
	imageServicesVar.unlinkImages = function(scope, deleteImage, id){
		    var unlinkImages = $http.post("php/api/getPackages.php?method=deleteImagesFrmFolder&jsoncallback=", deleteImage);
			unlinkImages.then(function(data){	
				scope.$emit('onDeleteHotelImageUnlink', id);
		});
	}
	
	imageServicesVar.editHotelImgDesc = function(featuredObj, scope){
		    var editFeatLink = $http.post("php/api/getHotelLinks.php?method=editHotelImgDesc&jsoncallback=", featuredObj);
			editFeatLink.then(function(data){							
					scope.$emit('onImgEditImageSuccess');
				
			});
		}
	

	return imageServicesVar
});