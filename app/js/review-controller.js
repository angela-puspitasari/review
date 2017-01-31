var app = angular.module('review', ['datatables', 'ngResource','main'])
.controller('ReviewController', ReviewController);
app.directive('mainPage',function(){
		return {
			restrict: 'E',
			templateUrl: 'app/src/review.html'
		};
	});
function ReviewController($resource) {
    var vm = this;
    $resource('all.json').query().$promise.then(function(project) {
       console.log(project);  
      vm.project = project;
    });
}
