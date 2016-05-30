var app = angular.module('footyApp', ['ngTouch']);

app.controller('bodyController', function($scope){
	$scope.rightSwipe = function(){
		switch($('.tab-pane.active').attr('id')) {
		    case 'page1':
		        $('[href="#page3"]').tab('show');
		        break;
	   	    case 'page2':
		        $('[href="#page1"]').tab('show');
		        break;
		    case 'page3':
		        $('[href="#page2"]').tab('show');
		        break;
		} 
	};

	$scope.leftSwipe = function(){
		switch($('.tab-pane.active').attr('id')) {
		    case 'page1':
		        $('[href="#page2"]').tab('show');
		        break;
	   	    case 'page2':
		        $('[href="#page3"]').tab('show');
		        break;
		    case 'page3':
		        $('[href="#page1"]').tab('show');
		        break;
		} 
	};
});

app.controller('NextWednesdayController', function(){

	var dif;
	var d = new Date(); // Today's date
	if (d.getDay() != 3) { // ako nije danas potraži iduću srijedu
		dif = 7 - ((d.getDay() + 4) % 7); // Number of days to add until wednesday
		d.setDate(d.getDate() + dif);
	}
	this.day = d.getDate();
	this.month = d.getMonth()+1;

});

app.controller('RegistrationController', function($scope, $http, $rootScope) {

	var registrations = this;

	var getRegistrations = function() {
		$http.get('api/prijave').then(function(response){
			registrations.players = response.data;
			$('#prijavePill').html('Prijave ('+registrations.players.length+')');
		});
	};

	getRegistrations();
	
	$scope.submitPlayer = function(){
		if (!$scope.newPlayer) return;
		$http.post('api/prijave?name=' + $scope.newPlayer).then(function(response){
			getRegistrations();
		});
		$scope.newPlayer = '';
	};

	$scope.deletePlayer = function(index){
		bootbox.confirm('Briši "' + registrations.players[index].name+ '"?', function(result) {
  			if (result) {
  				$http.delete('api/prijave?id=' + registrations.players[index]._id).then(function(response){
					getRegistrations();
				});
  			};
		}); 
		
	};

	$rootScope.$on('refreshRegularsEvent', function(event) { getRegistrations(); });

	});

app.controller('AbsenceController', function($scope, $http) {

	var absences = this;

	var getAbsences = function() {
		$http.get('api/nemogu').then(function(response){
			absences.players = response.data;
			$('#neMoguPill').html('Ne mogu ('+absences.players.length+')');
		});
	};

	getAbsences();
	
	$scope.submitPlayer = function(){
		if (!$scope.newPlayer) return;
		$http.post('api/nemogu?name=' + $scope.newPlayer).then(function(response){
			getAbsences();
		});
		$scope.newPlayer = '';
	};

	$scope.deletePlayer = function(index){
		bootbox.confirm('Briši "' + absences.players[index].name+ '"?', function(result) {
  			if (result) {
				$http.delete('api/nemogu?id=' + absences.players[index]._id).then(function(response){
					getAbsences();
				});
			};
		}); 
	};

	});

app.controller('RegularsController', function($scope, $http, $rootScope) {

	var regulars = this;

	var getRegulars = function() {
		$http.get('api/stalni').then(function(response){
			regulars.players = response.data;
			$('#stalniPill').html('Stalni ('+regulars.players.length+')');
		});
	};

	getRegulars();
	
	$scope.submitPlayer = function(){
		if (!$scope.newPlayer) return;
		$http.post('api/stalni?name=' + $scope.newPlayer).then(function(response){
			getRegulars();
		});
		$scope.newPlayer = '';
	};

	$scope.deletePlayer = function(index){
		bootbox.confirm('Briši "' + regulars.players[index].name+ '"?', function(result) {
  			if (result) {
				$http.delete('api/stalni?id=' + regulars.players[index]._id).then(function(response){
					getRegulars();
				});
			};
		}); 
	};


	$scope.registerPlayer = function(index){
		$http.post('api/prijave?name=' + regulars.players[index].name).then(function(response){
			$rootScope.$emit('refreshRegularsEvent');
			bootbox.alert(regulars.players[index].name + ' je prijavljen.');
		});
			
	};

	});
