// JavaScript Document
app.filter('getById', function() {
  return function(array, id) {
	     var returnArry = [];
			for(var i=0; i<array.length; i++) {
				if (array[i].id == +id) {
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