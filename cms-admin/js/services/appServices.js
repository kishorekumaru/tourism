// JavaScript Document

app.factory("loginServices", function($http, $rootScope, sessionServices, $location){
	return{
		loginUser:function(users, scope){
			var loginUser= $http.post("php/api/getUsers.php?method=validateUser&jsoncallback=", users);
			loginUser.then(function(msg){	
				var userID = parseInt(msg.data)			
				if(userID){
					sessionServices.set('user', userID); 
					scope.$emit('loginSuccess'); 
				}else{
					scope.$emit('loginFailure'); 
				}
			});
			},
			
		 logOutUser:function(){
			 sessionServices.destory('user');
			 $rootScope.$broadcast('showHideNaveBar', [false]);
			 
		 },
		 islogged:function(){
			 if(sessionServices.get('user')) return true;
			 
		 }
		}
});




app.factory("hotelServices", function($http){
	return{
		getHotels:function(scope){
			var getHotelDetails= $http.get("php/api/getPackages.php?method=getAllHotels&jsoncallback=");
			getHotelDetails.then(function(data){
				scope.$emit('loadDetails', [data]);
				console.log(data.data);
			});
		}
	}
});