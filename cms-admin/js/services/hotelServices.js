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
		}
	}
});


app.factory("hotelAddServices", function($http){
	return{
		addHotels:function(hotels, scope){
			var addHotels= $http.post("php/api/getPackages.php?method=addHotels&jsoncallback=", hotels);
			addHotels.then(function(data){				
				if(data.data == "1"){
					scope.$emit('reloadDetails'); 
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
				if(data.data == "1"){
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
				if(data.data == "1"){
					scope.$emit('reloadDetails'); 
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