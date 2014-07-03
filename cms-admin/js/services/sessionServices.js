// JavaScript Document
app.factory('sessionServices',['$http',function($http){
	return{
		set:function(key, value){
			return sessionStorage.setItem(key, value);
		},
		get:function(key){
			return sessionStorage.getItem(key);
		},
		destory:function(key){
			return sessionStorage.removeItem(key);
		}
	}
}]);