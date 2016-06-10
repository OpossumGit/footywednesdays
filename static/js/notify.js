var app = angular.module('notifyApp', []);

app.controller('notifyController', function($scope, $http){
	$scope.submitNotification = function(){
		if (!$scope.newNotification) return;
		$http.post('api/notifikacija?text=' + $scope.newNotification);
		$scope.newNotification ='';
	};

	$scope.deleteNotification = function(){
		$http.delete('api/notifikacija');
	};
});

