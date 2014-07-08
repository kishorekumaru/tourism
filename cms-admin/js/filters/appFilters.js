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