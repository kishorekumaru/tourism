// JavaScript Document
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