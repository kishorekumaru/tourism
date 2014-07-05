// JavaScript Document
app.factory("packServices", function($http){
	return{
		getPackages:function(scope){
			var getPackDetails= $http.get("php/api/getPackages.php?method=getAllPackages&jsoncallback=");
			getPackDetails.then(function(data){
				scope.$emit('loadPackDetails', [data]);
			});
		},
		getPackByOrder:function(orderItem, scope){
			var getPackByOrder= $http.post("php/api/getPackages.php?method=getPackByOrder&jsoncallback=", orderItem);
			getPackByOrder.then(function(data){
				scope.$emit('loadPackDetails', [data]);				
			});
		}
	}
});