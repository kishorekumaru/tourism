// JavaScript Document
app.filter('getById', function() {
  return function(array, id) {
	     var returnArry = [];
			for(var i=0; i<array.length; i++) {
				if (array[i].id == id) {
					return array[i];
				}
		}
    };
    return returnArry;
});


app.filter('dateToISO', function() {
  return function(input) {
    input = new Date(input).toISOString();
    return input;
  };
});


//Filter by package ID

app.filter('getByPackageId', function() {
  return function(array, id) {
	     var returnArry = [];
			for(var i=0; i<array.length; i++) {
				if (array[i].package_id == id) {
					returnArry.push(array[i]);
				}
		}
		 return returnArry;
    };
   
});

//Filter by hotel ID
app.filter('getByHotelId', function() {
  return function(array, id) {
	     var returnArry = [];
			for(var i=0; i<array.length; i++) {
				if (array[i].hotel_id == id) {
					returnArry.push(array[i]);
				}
		}
		 return returnArry;
    };
   
});



app.filter('filterLinkedHotels', function() {
  return function(arr1, linkStr) {
		arr2 = linkStr.split(",");
		var filteredArr = arr1.filter(function(element){
			return arr2.indexOf(element.id) != -1
		});		
		return filteredArr;
    };
});


app.filter('filterRestHotels', function() {
  return function(arr1, linkStr) {
		arr2 = linkStr.split(",");
		var filteredArr = arr1.filter(function(element){
			return arr2.indexOf(element.id) == -1
		});		
		return filteredArr;
    };
});


app.filter('filterRestIds', function() {
  return function(arr1, linkStr) {
		arr2 = linkStr.split(",");
		var filteredArr = arr1.filter(function(element){
			return arr2.indexOf(element) == -1
		});		
		return filteredArr;
    };
});
