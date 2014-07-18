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
			template:"<div class='row'><div class='col-md-6'><p class='input-group'><input type='text' class='form-control' datepicker-popup='{{format}}' disabled ng-model='{{dt}}' is-open='opened' min-date='minDate' max-date=''2015-06-22''   datepicker-options='dateOptions' date-disabled='disabled(date, mode)' ng-required='true' close-text='Close' /><span class='input-group-btn'><button type='button' class='btn btn-default' ng-click='open($event)' ><i class='glyphicon glyphicon-calendar'></i></button></span></p></div></div>"
    };
});



app.directive('uiDate', function() {
    return {
      require: '?ngModel',
      link: function($scope, element, attrs, controller) {
        var originalRender, updateModel, usersOnSelectHandler;
        if ($scope.uiDate == null) $scope.uiDate = {};
        if (controller != null) {
          updateModel = function(value, picker) {
            return $scope.$apply(function() {
              return controller.$setViewValue(element.datepicker("getDate"));
            });
          };
          if ($scope.uiDate.onSelect != null) {
            usersOnSelectHandler = $scope.uiDate.onSelect;
            $scope.uiDate.onSelect = function(value, picker) {
              updateModel(value);
              return usersOnSelectHandler(value, picker);
            };
          } else {
            $scope.uiDate.onSelect = updateModel;
          }
          originalRender = controller.$render;
          controller.$render = function() {
            originalRender();
            return element.datepicker("setDate", controller.$viewValue);
          };
        }
        return element.datepicker($scope.uiDate);
      }
    };
  });
  
  
app.directive('displayTag', function() {
      return {
			scope:{},
			restrict: 'E',
			
			link:function(scope, elm, attrs){
				
				// Get the attr values to scope values
				scope.labelName = attrs.labelName;
				scope.labelValue = attrs.labelValue;
				
			},
			template:"  <div class='form-group'><label  class='col-sm-5 control-label'>{{ labelName }}</label><div class=''><label  class='col-sm-5 control-label' style='font-weight:normal'>{{ labelValue }}</label></div>",
			replace:false
    };
  });




                    
