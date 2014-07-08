// JavaScript Document
app.directive('fileInput', ['$parse', function ($parse) {
    return {
			restrict: 'A',
			link:function(scope, elm, attrs){
				elm.bind('change', function(){
					$parse(attrs.fileInput)
					.assign(scope, elm[0].files);
					scope.files = elm[0].files;
					scope.$apply();
				})
			}
    };
}]);



app.directive('dateField', function () {
    return {
			scope:{},
			restrict: 'E',
			
			link:function(scope, elm, attrs){
				scope.toggleMin = function() {
					scope.minDate = scope.minDate ? null : new Date();
				};
				
				// Disable weekend selection
				 scope.disabled = function(date, mode) {
					return 0;
				  };
				scope.toggleMin();
				
				scope.dt = attrs.dateValue;
				scope.dateId = attrs.dateId;
				scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd/MM/yyyy', 'shortDate'];
				scope.format = scope.formats[1];
				
				scope.open = function($event) {
					$event.preventDefault();
					$event.stopPropagation();				
					scope.opened = true;
					scope.$emit('dateValidChanged', [scope]);
			  };
			  
			},
			replace:true,
			template:"<div class='row'><div class='col-md-6'><p class='input-group'><input type='text' class='form-control' datepicker-popup='{{format}}' disabled ng-model='dt' is-open='opened' min-date='minDate' max-date=''2015-06-22''   datepicker-options='dateOptions' date-disabled='disabled(date, mode)' ng-required='true' close-text='Close' /><span class='input-group-btn'><button type='button' class='btn btn-default' ng-click='open($event)' ><i class='glyphicon glyphicon-calendar'></i></button></span></p></div></div>"
    };
});



