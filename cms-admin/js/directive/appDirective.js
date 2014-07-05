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

				scope.open = function($event) {
					$event.preventDefault();
					$event.stopPropagation();				
					scope.opened = true;
			  };
			},
			replace:true,
			template:"<div class='row'><div class='col-md-6'><p class='input-group'><input type='text' class='form-control' datepicker-popup='{{format}}'  is-open='opened' min-date='minDate' max-date=''2015-06-22'' datepicker-options='dateOptions' date-disabled='disabled(date, mode)' ng-required='true' close-text='Close' /><span class='input-group-btn'><button type='button' class='btn btn-default' ng-click='open($event)'><i class='glyphicon glyphicon-calendar'></i></button></span> </p></div></div>"
    };
});



app.directive('packageView', function () {
    return {
			scope:{},
			restrict: 'E',
			link:function(scope, elm, attrs){
				scope.packageCode = attrs.packageCode;
				scope.packageName = attrs.packageName;
				scope.desinationCovered=attrs.desinationCovered;
				scope.currency = attrs.currency;
				scope.cost = attrs.cost;
				scope.tourDuration = attrs.tourDuration;
				scope.inclusion = attrs.inclusion;
				scope.exclusion = attrs.exclusion;
				scope.validFrom = attrs.validFrom;
				scope.validTo = attrs.validTo;
				scope.tour_Details = attrs.tour_Details;
	
				
				scope.editPackage = function() { 
				alert('editpack');
				};
				scope.manageDays = function() { alert('manageDays'); };
				scope.manageImage = function() { alert('manageImage'); };
				scope.deletePackage = function() { alert('deletePackage'); };
				
			},
			replace:true,
			template:"<div class='panel panel-info'><div class='panel-heading'>{{ packageCode }}</div><div class='panel-body'><div class 'col-md-4'><img ng-src=''> <div>{{ packageName }}</div></div><div class='col-md-4'><div class='col-md-2'>{{ desinationCovered}}</div><div class='col-md-2'>{{ currency + ':' + cost + ' (' + tourDuration + ')' }} + </div><div class='col-md-2'>{{ inclusion }}</div><div class='col-md-2'>{{ exclusion }}</div><div class='col-md-2'>{{ validFrom + '-' + validTo}}</div><div class='col-md-3'>{{ tour_Details }}</div></div><div class='col-md-4'><div class ='col-md-2'><button type='button' class='btn btn-link' ng-click='editPackage()'>Edit Package</button></div><div class='col-md-2'><button type='button' class='btn btn-link' ng-click='manageDays()'>Manage Days Details</button></div><div class='col-md-2'><button type='button' class='btn btn-link' ng-click='manageImage()'>Manage Image Details</button></div> <div class='col-md-2'><button type='button' class='btn btn-link' ng-click='deletePackage()'>Delete Details</button></div></div></div></div>"
			
    };
});