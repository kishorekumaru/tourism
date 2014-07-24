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


app.filter('searchObjectItem', function(){

	return function(array, value, object_name){
		var returnArry = [];
			for(var i=0; i<array.length; i++) {
				if (String(array[i][object_name]).toUpperCase()== String(value).toUpperCase()) {
					returnArry.push(array[i]);
				}
		}
		 return returnArry;
	}
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


//Filter based upon the column name and value
app.filter('filterOnCondition', function() {
  return function(arr1, colName, value) {
		var returnArry = [];
			for(var i=0; i<arr1.length; i++) {
				if (arr1[i][colName] == value) {
					returnArry.push(arr1[i]);
				}
		}
		 return returnArry;
    };
});

